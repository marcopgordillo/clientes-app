import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { Subscription } from 'rxjs/internal/Subscription';

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
