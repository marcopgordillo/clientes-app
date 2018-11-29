import {Component, OnInit} from '@angular/core';
import {Cliente} from '../cliente.model';
import {ClienteService} from '../cliente.service';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  titulo = 'Detalle del Cliente';
  private fotoSeleccionada: File;
  private urlEndPoint = 'http://localhost:8080/api/uploads/img/';

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const id: number = +params.get('id');
        if (id) {
          this.clienteService.getCliente(id)
            .subscribe(cliente => this.cliente = cliente);
        }
      });
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal('Error seleccionar imagen', 'El archivo debe ser de tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if (!this.fotoSeleccionada) {
      swal('Error Upload', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(cliente => {
            this.cliente = cliente;
            swal('La foto se ha subido con éxito!', `Se ha subido la foto: ${this.cliente.foto}`, 'success');
          },
          error => console.log(error)
        );
    }

  }
}
