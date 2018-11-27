import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit, OnDestroy {

  clientes: Cliente[];
  subscription: Subscription;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.subscription = this.clienteService.getClientes()
    .subscribe(
      (clientes: Cliente[]) => this.clientes = clientes);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
