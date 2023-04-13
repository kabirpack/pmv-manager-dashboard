import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static readonly BASE_URL = 'http://localhost:8080';
  title = 'pmv-manager-dashboard';

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit(): void {
      this.authService.autoLogin();
  }
}
