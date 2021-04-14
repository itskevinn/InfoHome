import { Casa } from './casa';
import { Usuario } from './usuario';
export class Publicacion {
  titulo: string
  detalle: string
  id: string
  fecha: Date
  usuario: Usuario
  imagenes: string[]
  casa: Casa
}
