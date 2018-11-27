import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear Cliente';

  constructor(private clienteService: ClienteService,
              private router: Router) { }

  ngOnInit() {
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      response => this.router.navigate(['clientes'])
    );
  }

}
