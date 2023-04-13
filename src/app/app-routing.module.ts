import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { ServiceCarRegistrationComponent } from "./service-car-registration/service-car-registration.component";
import { NgModule } from "@angular/core";
import { ServicecarListComponent } from "./servicecar-list/servicecar-list.component";
import { ServiceTicketListComponent } from "./service-ticket-list/service-ticket-list.component";
import { ServiceSummaryComponent } from "./service-summary/service-summary.component";
import { AuthGuardService } from "./services/auth-guard.service";

const appRoutes: Routes = [
    {path : '', redirectTo: '/auth', pathMatch: 'full'},
    {path : 'auth', component: AuthenticationComponent},
    {path : 'regCar', canActivate:[AuthGuardService], component: ServiceCarRegistrationComponent},
    {path : 'carList', canActivate:[AuthGuardService], component: ServicecarListComponent},
    {path : 'serviceTicketList', canActivate:[AuthGuardService], component: ServiceTicketListComponent},
    {path : 'serviceSummary', canActivate:[AuthGuardService], component: ServiceSummaryComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes) ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}