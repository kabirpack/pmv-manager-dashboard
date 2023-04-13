import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceCarService } from '../services/service-car.service';
import { ServiceCar } from '../models/service-car.model';
import { Subject } from 'rxjs';
import { ServiceTicketFormComponent } from '../service-ticket-form/service-ticket-form.component';

@Component({
  selector: 'app-servicecar-list',
  templateUrl: './servicecar-list.component.html',
  styleUrls: ['./servicecar-list.component.css']
})
export class ServicecarListComponent implements OnInit {

  serviceCarList: ServiceCar[] = [];
  dtoptions: DataTables.Settings ={};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild('serviceTicketModal', {static : false}) serviceTicketModal! : ServiceTicketFormComponent;


  constructor(private serviceCarService: ServiceCarService) { }

  ngOnInit(): void {
    this.dtoptions={
      pagingType: 'simple_numbers'
    };
    this.loadServiceCars();
  }

  loadServiceCars() {
    this.serviceCarService.getUpcomingServiceCars()
    .subscribe( (responseData : ServiceCar[]) => {
      if(responseData) {
        this.serviceCarList = responseData;
        this.dtTrigger.next(null);
      }
    },
    errorMessage => {
      alert(errorMessage);
    });

  }

  onClickService(car: ServiceCar) {
    this.serviceTicketModal.show(car);
  }

}
