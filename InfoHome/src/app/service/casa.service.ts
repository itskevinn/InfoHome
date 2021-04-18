import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Casa } from '../interfaces/casa';

@Injectable({
  providedIn: 'root'
})
export class CasaService {
  baseUrl: string
  public casas: Casa[] = [];
  constructor(
    private http: HttpClient
  ) { this.baseUrl = "https://localhost:5001/" }

  save(casa: Casa) {
    return this.http.post<Casa>(this.baseUrl + "api/Casa", casa).pipe(
      tap((_) => {
        this.updateWhenSaved();
      }),
    );
  }
  updateWhenSaved() {
    this.gets();
    console.log("Casa guardada exitosamente")
  }
  gets() {
    return this.http.get<Casa[]>(this.baseUrl + 'api/Casa').pipe(
      tap((p) => this.casas = p)
    )
  }
  getsByUser(id: string) {
    console.log(id);
    const url = `${this.baseUrl}api/CasaUsuario/${id}`
    return this.http.get<Casa[]>(url).pipe(
      tap((r) => {
        this.casas = r
      })
    );
  }
  edit(id: string, casa: Casa) {
    const url = `${this.baseUrl}api/Casa/${id}`
    return this.http.put<Casa>(url, casa).pipe(
      tap((_) => console.log("Casa editada")
      ));
  }
  delete(id: string) {
    const url = `${this.baseUrl}api/Casa/${id}`
    return this.http.delete<Casa>(url).pipe(
      tap((_) => console.log("Casa eliminada")
      )
    )
  }
}
