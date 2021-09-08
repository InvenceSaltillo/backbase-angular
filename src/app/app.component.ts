import { Component, OnInit, ViewChild } from '@angular/core';
export class CSVRecord {
 public cuenta: any;
 public cuentaFinal: any;
 public moneda: any;
 public descripcion: any;
 public deposito: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'backbase';

  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  constructor(){}

  ngOnInit(): void{}


  uploadListener($event: any): void {

    const text = [];
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = ( csvData as string).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = () => {
        console.log('Ocurrió un error mientras se leia el archivo!');
      };

    } else {
      alert('Por favor importe un archivo .csv valido.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any): any {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = ( csvRecordsArray[i] as string).split(',');

      if (curruntRecord.length === headerLength) {
        const csvRecord: CSVRecord = new CSVRecord();
        csvRecord.cuenta = curruntRecord[0].trim();
        csvRecord.cuentaFinal = curruntRecord[1].trim();
        csvRecord.moneda = curruntRecord[2].trim();
        csvRecord.descripcion = curruntRecord[3].trim();
        csvRecord.deposito = curruntRecord[4].trim();
        csvArr.push(csvRecord);
      }
    }
    this.fileReset();
    return csvArr;
  }

  isValidCSVFile(file: any): any {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any): any {
    const headers = ( csvRecordsArr[0] as string).split(',');
    const headerArray = [];


    for (const header of headers) {
      headerArray.push(header);
    }

    // for (let j = 0; j < headers.length; j++) {
    //   headerArray.push(headers[j]);
    // }
    return headerArray;
  }

  fileReset(): void {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }

}


