import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';
import { MessageDictionary } from '../models/message-dictionary';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  isAuthenticated: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthenticationService) {
    this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated = !!user;
    if(user) {
      if(user.userRole == MessageDictionary.ADMIN) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }  
    }
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
