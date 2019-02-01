import { Component, OnDestroy, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, OnDestroy {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  urlImgEndPoint: string = environment.urlImgEndPoint;
  private subscription: Subscription;

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute,
              public modalService: ModalService,
              public authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.clienteService.getClientes(page)
        .subscribe(
          response => {
            this.clientes = response.content as Cliente[];
            this.paginador = response;
          });
      }
    );

    this.subscription = this.modalService.notificarUpload
      .subscribe(cliente => {
        this.clientes = this.clientes.map(clienteOriginal => {
          if (cliente.id === clienteOriginal.id) {
            clienteOriginal.foto = cliente.foto;
          }
          return clienteOriginal;
        });
      });
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
      text: `¿Seguro que deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
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

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
