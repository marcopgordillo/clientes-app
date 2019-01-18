import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form/form.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data:
      {role: 'ROLE_ADMIN'}},
  { path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data:
      {role: 'ROLE_ADMIN'} },
  { path: 'login', component: LoginComponent },
  { path: 'facturas/:id', component: DetalleFacturaComponent },
  { path: 'facturas/form/:clienteId', component: FacturasComponent },
  { path: 'notfound404', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
