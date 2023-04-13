import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ServiceCarRegistrationComponent } from './service-car-registration/service-car-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ServicecarListComponent } from './servicecar-list/servicecar-list.component';
import { DataTablesModule } from 'angular-datatables';
import { ServiceTicketFormComponent } from './service-ticket-form/service-ticket-form.component';
import { ServiceTicketListComponent } from './service-ticket-list/service-ticket-list.component';
import { ServiceSummaryComponent } from './service-summary/service-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthenticationComponent,
    ServiceCarRegistrationComponent,
    ServicecarListComponent,
    ServiceTicketFormComponent,
    ServiceTicketListComponent,
    ServiceSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
