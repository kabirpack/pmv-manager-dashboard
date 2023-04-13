import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MessageDictionary } from '../models/message-dictionary';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(authForm: NgForm) {

    const userName = authForm.value.userName;
    const password = authForm.value.password;

    this.authenticationService.authenticate(userName, password)
    .subscribe( (responseData : User) => {
      if(responseData) {
        this.authenticationService.routeUser(responseData);
      }
    },
    errorMessage => {
      alert(errorMessage);
    });   
    }

  }
