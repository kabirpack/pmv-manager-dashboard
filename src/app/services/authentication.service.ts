import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageDictionary } from '../models/message-dictionary';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static readonly AUTHENTICATION_URL = '/authenticate';
  static readonly GET_DRIVER_IDS_URL = '/getDriverIds';

  user = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient, private router: Router) { }

  authenticate(userName: string, password: string) {

    const url = AppComponent.BASE_URL + AuthenticationService.AUTHENTICATION_URL;

    const authenticationPayLoad = {
      'userName' : userName,
      'password' : password
    };

    return this.http.post<User>(url, authenticationPayLoad)
    .pipe(map(
      (responseData: User) => {
        if(!responseData.errorMessage){
          this.user.next(responseData);
          localStorage.setItem('userData', JSON.stringify(responseData));
          return responseData;
        }
        return throwError(() => responseData.errorMessage);
      }),
      catchError(errorResponse => {
        return throwError(() => "error occured while authentication");
      })
    );
  }

  logout() {
    this.user.next(null);
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData: {
      userId: number,
      userName: string,
      userRole: string,
      errorMessage: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }
    const loadedUser = new User(userData.userId, userData.userName, userData.userRole, userData.errorMessage);
    this.user.next(loadedUser);
    this.routeUser(loadedUser);
  }

  routeUser(user: User) {
    switch(user.userRole) {
      case MessageDictionary.DRIVER:
        this.router.navigate(['/serviceTicketList']);
        break;
      case MessageDictionary.ADMIN:
        this.router.navigate(['/regCar']);
        break;
      case MessageDictionary.ENGINEER:
        this.router.navigate(['/carList']);
        break;
      case MessageDictionary.MANAGER:
        this.router.navigate(['/serviceSummary']);
        break;
    }
  }

  getDriverIds() {
    const url = AppComponent.BASE_URL + AuthenticationService.GET_DRIVER_IDS_URL;
    return this.http.get<number[]>(url)
    
  }




}