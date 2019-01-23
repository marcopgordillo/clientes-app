import { Injectable } from '@angular/core';
import { Factura } from '../models/factura.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filtrarProductos(term: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`);
  }
}
