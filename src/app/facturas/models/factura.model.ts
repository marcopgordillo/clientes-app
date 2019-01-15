import { ItemFactura } from './item-factura.model';
import { Cliente } from '../../clientes/cliente.model';

export class Factura {
  id: number;
  descripcion: string;
  observacion: string;
  items: ItemFactura[] = [];
  cliente: Cliente;
  total: number;
  createAt: string;
}
