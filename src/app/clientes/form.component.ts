import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo = 'Crear Cliente';

  constructor() { }

  ngOnInit() {
  }

  create(): void {
    console.log('clicked!');
    console.log(this.cliente);
  }

}
