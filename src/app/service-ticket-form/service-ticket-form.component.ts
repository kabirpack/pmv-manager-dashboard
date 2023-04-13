import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceCar } from '../models/service-car.model';
import { NgForm } from '@angular/forms';
import { ServiceTicketService } from '../services/service-ticket.service';
import { ServiceTicket } from '../models/service-ticket.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-service-ticket-form',
  templateUrl: './service-ticket-form.component.html',
  styleUrls: ['./service-ticket-form.component.css']
})
export class ServiceTicketFormComponent implements OnInit {

  carToService = new BehaviorSubject<ServiceCar>(null);

  
  @ViewChild('showModal', {static : false}) showModal! : ElementRef;
  @ViewChild('serviceTicketForm', {static: true}) serviceTicketForm!: NgForm;


  constructor(private serviceTicketService: ServiceTicketService,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  show(car: ServiceCar) {
    this.carToService.next(car);
    this.showModal.nativeElement.click();
  }


  onSaveServiceTicket(form : NgForm) {
    const ticketParams = form.value;
    const engineer = this.auth.user.value;
    this.serviceTicketService.addServiceTicket(
      ticketParams.lastServiceMileage,
      ticketParams.lastServiceDate,
      ticketParams.serviceDescription,
      ticketParams.serviceCost,
      ticketParams.upcomingServiceDate,
      engineer.userName,
      this.carToService.value.plateNo
    )
    .subscribe( (responseData : ServiceTicket) => {
      if(responseData) {
        alert("saved succcessfully");
        this.clearForm();
        this.carToService.next(null);
      }
    },
    errorMessage => {
      alert(errorMessage);
      this.clearForm();
    });  }


  clearForm() {
    this.serviceTicketForm.reset();
    this.showModal.nativeElement.click();
  }
}
