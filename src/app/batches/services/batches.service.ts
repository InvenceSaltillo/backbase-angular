import { Injectable } from '@angular/core';
import { Batch, CSVRecord } from '../models/batches.model';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {

  public batches: Batch[] = [];

  constructor() { }



  isValidCSVFile(file: any): any {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any): any {
    const headers = ( csvRecordsArr[0] as string).split(',');
    const headerArray = [];


    for (const header of headers) {
      headerArray.push(header);
    }
    return headerArray;
  }
}
