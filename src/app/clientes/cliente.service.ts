import { Injectable } from '@angular/core';

import { Cliente } from './cliente.model';
import { CLIENTES } from './clientes.json';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ClienteService {

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
