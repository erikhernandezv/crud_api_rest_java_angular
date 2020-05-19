import { Injectable } from '@angular/core';
import { CUSTOMERS } from '../ado/clientes.json';
import { Cliente } from '../class/cliente';
import { DatePipe } from '@angular/common';
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
      map( response => {

        let clientes = response as Cliente[];

        //Aqui convertimos el campo nombre a mayuscula para mostrarlo en la salida
        return clientes.map(cliente => {
          cliente.name = cliente.name.toUpperCase();
          let datePipe = new DatePipe('en_US');
          //Salida fecha y hora normal ej: 2020-05-18 05:58:35
          //cliente.createAt = datePipe.transform(cliente.createAt,'yyyy-MM-dd HH:MM:ss');
          //salida Monday 01, January 2020
          cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy HH:MM:ss');
          return cliente;
        })

       })
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>( this.urlEndPoint, cliente, { headers: this.httpHeaders } ).pipe(
      map( (response:any) => response.cliente as Cliente),
      catchError(e=>{

        if(e.status===400){
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
