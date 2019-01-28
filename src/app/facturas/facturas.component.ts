import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura.model';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { FacturaService } from './services/factura.service';
import { Producto } from './models/producto.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ItemFactura } from './models/item-factura.model';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  titulo = 'Nueva Factura';
  factura: Factura = new Factura();
  autoCompleteControl = new FormControl();
  productos: string[] = ['Mesa', 'Tablet', 'Sony', 'Samsung', 'TV LG', 'Bicicleta'];
  productosFiltrados: Observable<Producto[]>;
  faTrashAlt = faTrashAlt;

  constructor(private clienteService: ClienteService,
              private facturaService: FacturaService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });

    this.productosFiltrados = this.autoCompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    const producto = event.option.value as Producto;

    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      const nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    const cantidad = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });

    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
  }

  create(facturaForm: any): void {

    if (this.factura.items.length == 0) {
      this.autoCompleteControl.setErrors({'invalid': true});
    }

    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturaService.create(this.factura).subscribe(factura => {
        swal(this.titulo, `Factura ${factura.descripcion} creada con éxito!`, 'success');
        this.router.navigate(['/clientes']);
      });
    }
  }
}
