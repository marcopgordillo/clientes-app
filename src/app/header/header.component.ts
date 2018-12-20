import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'App Angular';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

  }

  logout(): void {
    const username = this.authService.usuario.username;
    this.authService.logout();
    swal('Logout', `Hola ${username}, has cerrado sesión con éxito`, 'success');
    this.router.navigate(['/login']);
  }

}
