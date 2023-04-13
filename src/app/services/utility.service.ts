import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  convertEpochToDate(epoch: string) {
    let epochNum = Number(epoch);
    return new Date(epoch).toDateString();                     
  }

  getFormattedFromandTo() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var dd2 = String(today.getDate()-today.getDate()+1).padStart(2, '0');
    var mm = String(today.getMonth() +1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var to = yyyy + '-' + mm + '-' + dd
    var from = yyyy + '-' + mm + '-' + dd2
    return [from, to];

  }
}
