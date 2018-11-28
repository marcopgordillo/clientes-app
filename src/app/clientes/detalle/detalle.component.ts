import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;
  titulo = 'Detalle del Cliente';

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const id: number = +params['id'];
        if (id) {
          this.clienteService.getCliente(id)
            .subscribe(cliente => this.cliente = cliente);
        }
      });
  }

}
