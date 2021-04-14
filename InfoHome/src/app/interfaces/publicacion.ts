import { Casa } from './casa';
import { Imagen } from './imagen';
import { Usuario } from './usuario';
export interface Publicacion {
  titulo: string
  detalle: string
  id: string
  fecha: Date
  usuario: Usuario
  imagenes: Imagen[]
  casa: Casa
}
