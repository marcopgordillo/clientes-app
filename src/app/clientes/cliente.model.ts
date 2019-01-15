import { Region } from './region.model';
import { Factura } from '../facturas/models/factura.model';

export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  createAt: Date;
  email: string;
  foto: string;
  region: Region;
  facturas: Factura[] = [];
}
