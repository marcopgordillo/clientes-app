import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './clientes/cliente.service';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './clientes/form.component';
import localeES_EC from '@angular/common/locales/es-EC';
import { registerLocaleData } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';

registerLocaleData(localeES_EC, 'es_EC');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ClienteService,
    {provide: LOCALE_ID, useValue: 'es_EC'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
