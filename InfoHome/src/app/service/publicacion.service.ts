import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publicacion } from '../interfaces/publicacion';
import { Imagen } from '../interfaces/imagen';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  baseUrl: string
  public publicaciones: Publicacion[] = [];
  constructor(
    private http: HttpClient
  ) { this.baseUrl = "https://localhost:5001/" }

  save(publicacion: Publicacion) {
    publicacion.imagenes = this.darIdAImagenes(publicacion.imagenes, publicacion.id);
    console.log(publicacion.imagenes);
    return this.http.post<Publicacion>(this.baseUrl + "api/Publicacion", publicacion).pipe(
      tap((_) => this.updateWhenSaved(),
      ),
    );
  }
  darIdAImagenes(imagenes: Imagen[], id: string) {
    imagenes.forEach(img => {
      img.idPublicacion = id + imagenes.length + 1
    });
    return imagenes;
  }
  updateWhenSaved() {
    this.gets();
    console.log("Publicacion guardada exitosamente")
  }
  gets() {
    return this.http.get<Publicacion[]>(this.baseUrl + 'api/Publicacion').pipe(
      tap((p) => this.publicaciones = p)
    )
  }
  edit(id: string, publicacion: Publicacion) {
    const url = `${this.baseUrl}/api/Publicacion/${id}`
    return this.http.put<Publicacion>(url, publicacion).pipe(
      tap((_) => console.log("Publicacion editada")
      ));
  }
  delete(id: string) {
    const url = `${this.baseUrl}/api/Publicacion/${id}`
    return this.http.delete<Publicacion>(url).pipe(
      tap((_) => console.log("Publicacion eliminada")
      )
    )
  }
}
