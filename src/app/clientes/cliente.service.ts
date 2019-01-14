import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

import { Cliente } from './cliente.model';
import { Region } from './region.model';

@Injectable()
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient,
              private router: Router) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getClientes(page: number): Observable<any> {
    // return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          /*const datePipe = new DatePipe('es');
          cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');*/
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US', 'UTC-5');
          return cliente;
        });
        return response;
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {reportProgress: true});

    return this.http.request(req);
  }
}
