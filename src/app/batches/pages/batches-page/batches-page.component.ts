import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Batch } from '../../models/batches.model';

export class CSVRecord {
 public cuenta: any;
 public cuentaFinal: any;
 public moneda: any;
 public descripcion: any;
 public deposito: any;
}
@Component({
  selector: 'app-batches-page',
  templateUrl: './batches-page.component.html',
  styleUrls: ['./batches-page.component.css']
})
export class BatchesPageComponent implements OnInit {

  public batches: Batch[] = [];
  batchType = 'Backbase SEPA';
  isFileSelected = false;
  fileSelected: any;
  tabSelected = 0;
  active = 1;
  csvRecord: CSVRecord = new CSVRecord();
  total = 0;
  credits = 0;
  batchSelected: Batch | undefined;
  public delimitterChar = ',';

  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  constructor(private modalService: NgbModal){}

  ngOnInit(): void{
    console.log(this.batchSelected);
  }

  open(content: any): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  public get dateNow(): Date {
    return new Date();
  }

  uploadListener($event: any): void {

    const files = $event.srcElement.files;

    if (!files) { return; }

    if (this.isValidCSVFile(files[0])) {

      this.fileSelected = files[0];

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = ( csvData as string).split(/\r\n|\n/);

        try {
          this.delimitterChar = ',';
          const headersRow = this.getHeaderArray(csvRecordsArray);
          this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        } catch (error) {
          this.delimitterChar = ';';
          const headersRow = this.getHeaderArray(csvRecordsArray);
          this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        }



        const totalSizeKB = this.fileSelected.size / Math.pow(1024, 1);
        const totalSizeKBRounded = (Math.round(totalSizeKB * 100) / 100).toFixed(2);
        console.log(this.fileSelected);

        this.isFileSelected = true;
      };

      reader.onerror = () => {
        console.log('Ocurrió un error mientras se leia el archivo!');
      };

    } else {
      alert('Por favor importe un archivo .csv valido.');
      this.fileReset();
    }
  }

  addFileToList(): void {
    this.modalService.dismissAll();

    const batchToAdd: Batch = {
      file: this.fileSelected,
      type: this.batchType,
      uploadedOn: this.dateNow,
      status: 'Processed',
      currency: this.csvRecord.moneda,
      total: this.total,
      credits: this.credits,
    };
    this.batches.push(batchToAdd);
    this.fileReset();

    console.log('BatchesArr', this.batches);
  }

  public getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any): any {
    const csvArr = [];
    this.total = 0;

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const currentRecord = ( csvRecordsArray[i] as string).split(',');

      if (currentRecord.length === headerLength) {
        this.csvRecord = new CSVRecord();
        this.csvRecord.cuenta = currentRecord[0].trim();
        this.csvRecord.cuentaFinal = currentRecord[1].trim();
        this.csvRecord.moneda = currentRecord[2].trim();
        this.csvRecord.descripcion = currentRecord[3].trim();
        this.csvRecord.deposito = currentRecord[4].trim();
        csvArr.push(this.csvRecord);
      }
    }
    // this.fileReset();
    this.credits = csvArr.length;

    csvArr.forEach(record => {
      this.total += Number(record.deposito);
    });

    console.log('Record', this.total);
    return csvArr;
  }

  getHeaderArray(csvRecordsArr: any): any {
    const headers = ( csvRecordsArr[0] as string).split(',');
    const headerArray = [];


    for (const header of headers) {
      headerArray.push(header);
    }
    return headerArray;
  }

  isValidCSVFile(file: any): any {
    return file.name.endsWith('.csv');
  }

  fileReset(): void {

    this.csvReader.nativeElement.value = '';
    // this.records = [];
    this.fileSelected = null;
    this.batchType = 'Backbase SEPA';
  }

  // setBatchSelected(batch: any): void {

  //   const headersRow = this.getHeaderArray(csvRecordsArray);
  //   this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
  //   console.log(item);
  // }


}
