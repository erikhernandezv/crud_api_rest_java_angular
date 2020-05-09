import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../class/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clientesform',
  templateUrl: './cform.component.html',
  styles: [
  ]
})
export class CformComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  private title: string = "Crear Cliente";

  constructor( private clienteService: ClienteService,
               private router: Router,
               private activateRouter: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(): void{
    this.activateRouter.params.subscribe( params => {
      let id = params['id'];
      if ( id ){
        this.clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente );
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        swal.fire('New Customer', `Customer ${this.cliente.name} created successfully!`, 'success')
      }
    );
  }

  update(): void{
    this.clienteService.update(this.cliente)
        .subscribe( cliente => {
          this.router.navigate(['/clientes'])
          swal.fire('Update Client', `Customer ${cliente.name} updated successfully!`, 'success')
        })
  }

}
