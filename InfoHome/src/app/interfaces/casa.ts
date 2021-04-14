import { Usuario } from './usuario';
export interface Casa{
  direccion: string
  numeroDeCuartos: string
  numeroDeBaños: string
  propietario: Usuario
  tipo: string
}