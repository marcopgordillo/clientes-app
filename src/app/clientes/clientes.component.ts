import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import swal from 'sweetalert2';

import {Cliente} from './cliente.model';
import {ClienteService} from './cliente.service';
import {tap} from "rxjs/internal/operators";

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
      .pipe(
        tap(clientes => this.clientes = clientes)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });

    swalWithBootstrapButtons({
      title: '¿Estas seguro?',
      text: `¿Seguro que deseas eliminar al cliente ${cliente.nombre}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swalWithBootstrapButtons(
              'Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            );
          }
        );
      }
    });
  }
}
