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
  }

  subirFoto() {
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(cliente => {
        this.cliente = cliente;
        swal('La foto se ha subido con éxito!', `Se ha subido la foto: ${this.cliente.foto}`, 'success');
      },
        error => console.log(error));
  }
}
