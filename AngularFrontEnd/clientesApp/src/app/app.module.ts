import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Form
import { CformComponent } from './view/cliente/cform.component';
import { FormsModule } from '@angular/forms';

// Services
import { ClienteService } from './services/cliente.service';

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch:'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/form', component: CformComponent },
  { path: 'clientes/form/:id', component: CformComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    CformComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
