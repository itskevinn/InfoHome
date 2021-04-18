import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string
  public usuarios: Usuario[] = [];
  public usuario: Usuario
  private currentUserSubject: BehaviorSubject<Usuario>;
  authSubject = new BehaviorSubject(false);
  constructor(
    private http: HttpClient, private storage: Storage) {
    this.baseUrl = "https://localhost:5001/"
    this.storage.create();
    this.storage.get("usuarioLogeado").then(val => {
      if (val != null) {
        this.authSubject.next(true);
      }
      else {
        this.authSubject.next(false);
      }
    })
  }

  save(usuario: Usuario) {
    return this.http.post<Usuario>(this.baseUrl + "api/Usuario", usuario).pipe(
      tap((_) => this.updateWhenSaved(),
      ),
    );
  }
  /*  async saveStorage(usuario: Usuario) {
      if (usuario) {
        await this.storage.set('usuarioLogeado', usuario);
        this.authSubject.next(true);
      }
    }*/
  updateWhenSaved() {
    this.gets();
    console.log("Usuario guardado exitosamente")
  }
  gets() {
    return this.http.get<Usuario[]>(this.baseUrl + 'api/Usuario').pipe(
      tap((p) => this.usuarios = p)
    )
  }
  edit(id: string, usuarios: Usuario) {
    const url = `${this.baseUrl}api/Usuario/${id}`
    return this.http.put<Usuario>(url, usuarios).pipe(
      tap((_) => console.log("Usuario editado")
      ));
  }
  get(id: string) {
    const url = `${this.baseUrl}api/Usuario/${id}`
    return this.http.get<Usuario>(url).pipe(
      tap(async (r) => {
        this.usuario = r;
        console.log(this.usuario);
        await this.storage.set('usuarioLogeado', r);
      })
    )
  }

  delete(id: string) {
    const url = `${this.baseUrl}api/Usuario/${id}`
    return this.http.delete<Usuario>(url).pipe(
      tap((_) => console.log("Usuario eliminado")
      )
    )
  }
}
