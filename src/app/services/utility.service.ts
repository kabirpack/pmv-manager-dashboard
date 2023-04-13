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
}
