import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from '../region.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear Cliente';
  private errores: string[];
  regiones: Region[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    this.clienteService.getRegiones()
      .subscribe(regiones => this.regiones = regiones);
  }

  cargarCliente(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clienteService.getCliente(id)
          .subscribe(
          cliente => this.cliente = cliente
        );
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(
        cliente => {
          this.router.navigate(['clientes']);
          swal('Nuevo Cliente', `El cliente ${cliente.nombre} ha sido creado con éxito!`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.log('Código del error desde el backend: ' + err.status);
          console.log(err.error.errors);
        }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(
        json => {
          this.router.navigate(['clientes']);
          swal('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.log('Código del error desde el backend: ' + err.status);
          console.log(err.error.errors);
        }
    );
  }

  compararRegion(o1: Region, o2: Region): boolean {
    return o1 == null || o2 == null ? false : o1.id === o2.id; // Se está siendo menos estricto con == antes que con === por el caso de undefined con eso valida solo por valor y no por tipo.
    // return o1 === null || o2 === null || o1 === undefined || o2 == undefined ? false : o1.id === o2.id;
  }

}
