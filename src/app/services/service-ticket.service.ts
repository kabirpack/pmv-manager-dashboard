import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { ServiceTicket } from '../models/service-ticket.model';
import { catchError, map, throwError } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceTicketService {

  static readonly ADD_SERVICE_TICKET_URL = '/addServiceTicket';
  static readonly GET_UPCOMING_TICKETS = '/getUpcomingServiceTicketByDriver';
  static readonly GET_SERVICE_HISTORY = '/getServiceTicketHistoryByDriver';



  constructor(private http: HttpClient,
    private utility: UtilityService) { }

  addServiceTicket(lastServiceMileage: number,
    lastServiceDate: String,
    serviceDescription: string,
    serviceCost: number,
    upcomingServiceDate: string,
    serviceEngineerName: string,
    serviceCarPlateNo: number) {

      const ticketPayLoad = {
        'lastServiceMileage': lastServiceMileage,
        'lastServiceDate': lastServiceDate,
        'serviceDescription': serviceDescription,
        'serviceCost': serviceCost,
        'upcomingServiceDate': upcomingServiceDate,
        'serviceEngineerName': serviceEngineerName,
        'serviceCarPlateNo': serviceCarPlateNo
      };

      const url = AppComponent.BASE_URL + ServiceTicketService.ADD_SERVICE_TICKET_URL;

      return this.http.post<ServiceTicket>(url, ticketPayLoad)
      .pipe(map(
        (responseData: ServiceTicket) => {
          return responseData;
        }),
        catchError(errorResponse => {
          return throwError(() => "error occured while saving ticket details");
        })
      );
   }

   getServiceTickets(driverId: number, queryMode: string) {

    let url = AppComponent.BASE_URL;
    if( queryMode == "upcoming") {
      url = url + ServiceTicketService.GET_UPCOMING_TICKETS; 
    } else if(queryMode == "history") {
      url = url + ServiceTicketService.GET_SERVICE_HISTORY;
    }

    let queryParams = new HttpParams();
    queryParams = queryParams.append('driverId', driverId);

    return this.http.get<ServiceTicket[]>(url,
      {
        params: queryParams
      })
      .pipe(map(
        (responseData: ServiceTicket[]) => { 
          responseData = responseData.map(ticket => {
            ticket.upcomingServiceDate = this.utility.convertEpochToDate(ticket.upcomingServiceDate);
            ticket.lastServiceDate = this.utility.convertEpochToDate(ticket.lastServiceDate);
            return ticket;
          }) 
          return responseData;
        }),
        catchError(errorResponse => {
          return throwError(() => "error occured while fetching ticket details");
        })
      );


   }



   
}
