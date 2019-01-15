import { Component, OnInit } from '@angular/core';
import { FacturaService } from './services/factura.service';
import { Factura } from './models/factura.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.scss']
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo = 'Factura';


  constructor(private facturaService: FacturaService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.facturaService.getFactura(id).subscribe(factura => this.factura = factura);
    });
  }

}
