import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';
import {tap, catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Publicacion} from '../interfaces/publicacion';
import {Imagen} from '../interfaces/imagen';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  baseUrl: string;
  public publicaciones: Publicacion[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.connectionString;
  }

  save(publicacion: Publicacion) {
    publicacion.imagenes = this.darIdAImagenes(publicacion.imagenes, publicacion.id);
    console.log(publicacion.imagenes);
    console.log(publicacion);
    return this.http.post<Publicacion>(this.baseUrl + 'api/Publicacion', publicacion).pipe(
      tap((_) => this.updateWhenSaved(),
      ),
    );
  }

  getByType(tipo: string) {
    const url = `${this.baseUrl}api/PublicacionTipo/${tipo}`;
    return this.http.get<Publicacion[]>(url).pipe(
      tap((p) => {
        this.publicaciones = p;
        console.log(this.publicaciones);
      }),
    );
  }

  getsBySearch(search: string) {
    const url = `${this.baseUrl}api/PublicacionSearch/${search}`;
    return this.http.get<Publicacion[]>(url).pipe(
      tap((p) => {
        this.publicaciones = p;
      }),
    );
  }

  darIdAImagenes(imagenes: Imagen[], id: string) {
    imagenes.forEach(img => {
      img.idPublicacion = id + imagenes.length + 1;
    });
    return imagenes;
  }

  updateWhenSaved() {
    this.gets();
    console.log('Publicacion guardada exitosamente');
  }

  gets() {
    return this.http.get<Publicacion[]>(this.baseUrl + 'api/Publicacion').pipe(
      tap((p) => {
        this.publicaciones = p;
        console.log(this.publicaciones);
      })
    );
  }

  edit(id: string, publicacion: Publicacion) {
    const url = `${this.baseUrl}api/Publicacion/${id}`;
    return this.http.put<Publicacion>(url, publicacion).pipe(
      tap((_) => console.log('Publicacion editada')
      ));
  }

  delete(id: string) {
    const url = `${this.baseUrl}api/Publicacion/${id}`;
    return this.http.delete<Publicacion>(url).pipe(
      tap((_) => console.log('Publicacion eliminada')
      )
    );
  }
}
