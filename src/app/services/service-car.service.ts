import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServiceCar } from '../models/service-car.model';
import { catchError, map, throwError } from 'rxjs';
import { AppComponent } from '../app.component';
import { ServiceSummary } from '../models/service-summary.model';
import * as dayjs from 'dayjs';
import { UtilityService } from './utility.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceCarService {

  static readonly ADD_SERVICE_CAR_URL = '/addServiceCar';
  static readonly GET_UPCOMING_SERVICE_CARS = '/getUpcomingServiceCars';
  static readonly GET_SERVICESUMMARY = '/getCarsByServiceCost';


  constructor(private http: HttpClient,
    private utility: UtilityService) { }

  addServiceCar(plateNo: number,
    carModel: string,
    manufacturingYear: string,
    upcomingServiceDate: string,
    driverId: number) {

      const carPayLoad = {
        'plateNo': plateNo,
        'carModel': carModel,
        'manufacturingYear': manufacturingYear,
        'upcomingServiceDate': upcomingServiceDate,
        'driverId': driverId
      };

    const url = AppComponent.BASE_URL + ServiceCarService.ADD_SERVICE_CAR_URL;

    return this.http.post<ServiceCar>(url, carPayLoad)
    .pipe(map(
      (responseData: ServiceCar) => {
        return responseData;
      }),
      catchError(errorResponse => {
        return throwError(() => "error occured while saving car details");
      })
    );
 }


 getUpcomingServiceCars() {
  
    const url = AppComponent.BASE_URL + ServiceCarService.GET_UPCOMING_SERVICE_CARS;
    return this.http.get<ServiceCar[]>(url)
    .pipe(map(
      (responseData: ServiceCar[]) => {
        responseData = responseData.map(car => {
          car.upcomingServiceDate = this.utility.convertEpochToDate(car.upcomingServiceDate);
          return car;
        });
        return responseData;
      }),
      catchError(errorResponse => {
        return throwError(() => "error occured while retriving car details");
      })
    );
 }

 getServiceSummary(fromDate: string, toDate: string) {

  const url = AppComponent.BASE_URL + ServiceCarService.GET_SERVICESUMMARY

  let queryParams = new HttpParams();
  queryParams = queryParams.append('fromDate', fromDate);
  queryParams = queryParams.append('toDate', toDate);


  return this.http.get<ServiceSummary[]>(url,
    {
      params: queryParams
    })
    .pipe(map(
      (responseData: ServiceSummary[]) => {
        return responseData;
      }),
      catchError(errorResponse => {
        return throwError(() => "error occured while fetching service summary details");
      })
    );


 }
  

}
