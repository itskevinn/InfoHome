import { Usuario } from './usuario';
export class Casa {
  id: string;
  numeroDeBanos: string;
  numeroDeCuartos: string;
  barrio: string;
  direccion: string;
  departamento: string;
  ciudad: string;
  propietario: Usuario;
  idUsuario: string;
}
