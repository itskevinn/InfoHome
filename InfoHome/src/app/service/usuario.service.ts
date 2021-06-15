import {environment} from './../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Usuario} from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string;
  public usuarios: Usuario[] = [];
  public usuario: Usuario;
  private currentUserSubject: BehaviorSubject<Usuario>;
  authSubject = new BehaviorSubject(false);

  constructor(
    private http: HttpClient, private storage: Storage) {
    this.baseUrl = environment.connectionString;
    this.storage.create();
    this.storage.get('usuarioLogeado').then(val => {
      if (val != null) {
        this.authSubject.next(true);
      } else {
        this.authSubject.next(false);
      }
    });
  }

  save(usuario: Usuario) {
    return this.http.post<Usuario>(this.baseUrl + 'api/Usuario', usuario).pipe(
      tap((_) => this.updateWhenSaved(),
      ),
    );
  }

  updateWhenSaved() {
    this.gets();
  }

  gets() {
    return this.http.get<Usuario[]>(this.baseUrl + 'api/Usuario').pipe(
      tap((p) => this.usuarios = p)
    );
  }

  edit(id: string, usuarios: Usuario) {
    const url = `${this.baseUrl}api/Usuario/${id}`;
    return this.http.put<Usuario>(url, usuarios).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  get(id: string) {
    const url = `${this.baseUrl}api/Usuario/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(async (r) => {
        this.usuario = r;
        await this.storage.set('usuarioLogeado', r);
      })
    );
  }

  delete(id: string) {
    const url = `${this.baseUrl}api/Usuario/${id}`;
    return this.http.delete<Usuario>(url).pipe(
      catchError(err => {
        throw err;
      })
    );
  }
}
