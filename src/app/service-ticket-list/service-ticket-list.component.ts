import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServiceTicketService } from '../services/service-ticket.service';
import { ServiceTicket } from '../models/service-ticket.model';
import { MessageDictionary } from '../models/message-dictionary';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-service-ticket-list',
  templateUrl: './service-ticket-list.component.html',
  styleUrls: ['./service-ticket-list.component.css']
})
export class ServiceTicketListComponent implements OnInit {

  serviceTicketList: ServiceTicket[] = [];
  tableTitle = "Upcoming Services";
  dtoptions: DataTables.Settings ={};
  dtTrigger: Subject<any> = new Subject<any>();
  datatableinitialisedFlag = 0;
  showCost: boolean;


  constructor(private serviceTicketService : ServiceTicketService,
    private auth: AuthenticationService) { }

  ngOnInit(): void {

      this.dtoptions={
        pagingType: 'simple_numbers'
      };
  }

  getServiceTicketList(queryMode: string) {
    const driver = this.auth.user.value;
    this.serviceTicketService.getServiceTickets(driver.userId, queryMode)
    .subscribe( (responseData : ServiceTicket[]) => {
      if(responseData) {
        this.serviceTicketList = responseData;
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


  onClickHistory() {
    this.tableTitle = "History"
    this.getServiceTicketList(MessageDictionary.HISTORY_MODE);
    this.showCost =true;
  }

  onClickUpcoming() {
    this.tableTitle = "Upcoming Services"
    this.getServiceTicketList(MessageDictionary.UPCOMING_MODE);
    this.showCost = false;
  }

  

}
