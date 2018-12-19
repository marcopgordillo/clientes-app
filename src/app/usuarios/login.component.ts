import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';

  constructor() { }

  ngOnInit() {
  }

}
