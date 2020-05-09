import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../class/cliente';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  customers: Cliente[];

  constructor( private clientesService: ClienteService ) {
   }

  ngOnInit(): void {
    this.clientesService.getCustomers().subscribe(
      customers => this.customers = customers
    );
  }

  delete( cliente: Cliente ): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete the client ${ cliente.name } ${cliente.lastname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clientesService.delete(cliente.id).subscribe(
          response =>{
            this.customers = this.customers.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Client deleted!',
              `Client ${ cliente.name } ${cliente.lastname} has been successfully removed.`,
              'success'
            )

          }
        )
      }
    })
  }

}
