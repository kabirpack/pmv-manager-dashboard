import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceCarService } from '../services/service-car.service';
import { ServiceCar } from '../models/service-car.model';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-service-car-registration',
  templateUrl: './service-car-registration.component.html',
  styleUrls: ['./service-car-registration.component.css']
})
export class ServiceCarRegistrationComponent implements OnInit {

  driverIds: number[] = [];

  @ViewChild('serviceCarForm', {static: true}) serviceCarForm!: NgForm;


  constructor(private serviceCarService: ServiceCarService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.getDriverIds()
    .subscribe(data => {
      this.driverIds= data;
      console.log(this.driverIds);
    })
  }

  onSaveServiceCar(form : NgForm) {
    
    const carParams = form.value;
    this.serviceCarService.addServiceCar(
      carParams.plateNo,
      carParams.carModel,
      carParams.manufacturingYear,
      carParams.upcomingServiceDate,
      carParams.driverId
    )
    .subscribe( (responseData : ServiceCar) => {
      if(responseData) {
        alert("saved succcessfully");
        this.serviceCarForm.reset();
      }
    },
    errorMessage => {
      alert(errorMessage);
    });

  }

}
