import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/internal/operators';
import swal from 'sweetalert2';

import {Cliente} from './cliente.model';
import {Router} from '@angular/router';
import {DatePipe} from "@angular/common";


@Injectable()
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    // return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        const clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          let datePipe = new DatePipe('en-US');
          cliente.createAt = datePipe.transform(cliente.createAt, 'dd/MM/yyyy');
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US', 'UTC-5');
          return cliente;
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if (e.status==400) {
          return throwError(e);
        }

        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if (e.status==400) {
          return throwError(e);
        }

        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.error);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
