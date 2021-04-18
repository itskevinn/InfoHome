import { Casa } from "./casa"

export class Usuario{
  id: string
  nombre: string
  apellido: string
  fechaNacimiento: Date
  correo: string
  telefono: string
  casas: Casa[]
}