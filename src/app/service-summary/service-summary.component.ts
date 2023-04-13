import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServiceSummary } from '../models/service-summary.model';
import { ServiceCarService } from '../services/service-car.service';

@Component({
  selector: 'app-service-summary',
  templateUrl: './service-summary.component.html',
  styleUrls: ['./service-summary.component.css']
})
export class ServiceSummaryComponent implements OnInit {

  dtoptions: DataTables.Settings ={};
  dtTrigger: Subject<any> = new Subject<any>();
  serviceSummaryList: ServiceSummary[] = []
  fromDate: string;
  toDate: string;
  datatableinitialisedFlag = 0;

  constructor(private serviceCarService: ServiceCarService) { }

  ngOnInit(): void {
    this.dtoptions={
      pagingType: 'simple_numbers'
    };
  }

  getServiceSummary() {
    this.serviceCarService.getServiceSummary(this.fromDate, this.toDate)
    .subscribe( (responseData : ServiceSummary[]) => {
      if(responseData) {
        this.serviceSummaryList = responseData;
        if(this.datatableinitialisedFlag == 0) {

        this.dtTrigger.next(null);
          this.datatableinitialisedFlag = 1;
        }
      }
    },
    errorMessage => {
      alert(errorMessage);
    });
  }

  onSearchClicked() {

    if(this.fromDate && this.toDate) {
      this.getServiceSummary();
    } else {
      alert("please select valid from and to date");
      this.fromDate = "";
      this.toDate = "";
    }
  }

}
