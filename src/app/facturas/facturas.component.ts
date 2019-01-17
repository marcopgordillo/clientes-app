import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura.model';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo = 'Nueva Factura';
  factura: Factura = new Factura();

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });
  }

}
