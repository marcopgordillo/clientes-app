import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {id: 1,nombre: 'Andrés', apellido: 'Guzmán', email: 'profesor@bolsadeideas.com', createAt: new Date('2017-12-11')},
    {id: 2,nombre: 'Andrés', apellido: 'Guzmán', email: 'profesor@bolsadeideas.com', createAt: new Date('2017-12-11')},
    {id: 3,nombre: 'Andrés', apellido: 'Guzmán', email: 'profesor@bolsadeideas.com', createAt: new Date('2017-12-11')},
    {id: 4,nombre: 'Andrés', apellido: 'Guzmán', email: 'profesor@bolsadeideas.com', createAt: new Date('2017-12-11')},
    {id: 5,nombre: 'Andrés', apellido: 'Guzmán', email: 'profesor@bolsadeideas.com', createAt: new Date('2017-12-11')},
    {id: 6,nombre: 'Andrés', apellido: 'Guzmán', email: 'profesor@bolsadeideas.com', createAt: new Date('2017-12-11')},
    {id: 7,nombre: 'Andrés', apellido: 'Guzmán', email: 'profesor@bolsadeideas.com', createAt: new Date('2017-12-11')}
  ];

  constructor() { }

  ngOnInit() {
  }

}
