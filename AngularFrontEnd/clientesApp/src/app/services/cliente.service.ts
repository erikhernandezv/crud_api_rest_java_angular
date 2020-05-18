import { Injectable } from '@angular/core';
import { CUSTOMERS } from '../ado/clientes.json';
import { Cliente } from '../class/cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient,
               private router: Router ) { }

  // El observable esta escuchando un posible cambio en el objeto CLiente
  getCustomers(): Observable<Cliente[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[] )
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>( this.urlEndPoint, cliente, { headers: this.httpHeaders } ).pipe(
      map( (response:any) => response.cliente as Cliente),
      catchError(e=>{

        if(e.status==400){
           return throwError(e);
        }

        console.log(e.error.message);
        swal.fire(e.error.message, e.error.error, 'error')
        return throwError(e)
      })
    )
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/clientes']);
        console.log(e.error.message);
        swal.fire('Error al editar', e.error.message, 'error')
        return throwError(e)
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e=>{

        if(e.status==400){
          return throwError(e);
        }

        console.log(e.error.message);
        swal.fire(e.error.message, e.error.error, 'error')
        return throwError(e)
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>( `${this.urlEndPoint}/${id}`, {headers: this.httpHeaders} ).pipe(
      catchError(e=>{
        console.log(e.error.message);
        swal.fire(e.error.message, e.error.error, 'error')
        return throwError(e)
      })
    )
  }
}