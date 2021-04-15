import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string
  public usuarios: Usuario[] = [];
  public usuario: Usuario
  constructor(
    private http: HttpClient, private storage: Storage) {
    this.baseUrl = "https://localhost:5001/"
  }

  save(usuario: Usuario) {
    return this.http.post<Usuario>(this.baseUrl + "api/Usuario", usuario).pipe(
      tap((_) => this.updateWhenSaved(),
      ),
    );
  }
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
    const url = `${this.baseUrl}/api/Usuario/${id}`
    return this.http.put<Usuario>(url, usuarios).pipe(
      tap((_) => console.log("Usuario editado")
      ));
  }
  get(id: string) {
    const url = `${this.baseUrl}/api/Usuario/${id}`
    return this.http.get<Usuario>(url).pipe(
      tap((r) => this.usuario = r)
    )
  }
  async saveStorage(key: string, usuario: Usuario) {
    await this.storage.set(key, usuario);
  }
  delete(id: string) {
    const url = `${this.baseUrl}/api/Usuario/${id}`
    return this.http.delete<Usuario>(url).pipe(
      tap((_) => console.log("Usuario eliminado")
      )
    )
  }
}
