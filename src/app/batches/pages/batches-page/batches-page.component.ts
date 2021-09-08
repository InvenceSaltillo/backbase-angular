import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class CSVFile {
  public file: any;
  public uploadedDate: any;

 }

@Component({
  selector: 'app-batches-page',
  templateUrl: './batches-page.component.html',
  styleUrls: ['./batches-page.component.css']
})
export class BatchesPageComponent implements OnInit {

  public files: any = [];
  isFileSelected = false;
  fileSelected: any;

  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  constructor(private modalService: NgbModal){}

  ngOnInit(): void{
    console.log(this.dateNow);
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

      const totalSizeKB = this.fileSelected.size / Math.pow(1024, 1);
      const totalSizeKBRounded = (Math.round(totalSizeKB * 100) / 100).toFixed(2);
      console.log(this.fileSelected);

      this.isFileSelected = true;

    } else {
      alert('Por favor importe un archivo .csv valido.');
      this.fileReset();
    }
  }

  addFileToList(): void {
    this.modalService.dismissAll();
    this.files.push(this.fileSelected);
    this.fileReset();
  }

  isValidCSVFile(file: any): any {
    return file.name.endsWith('.csv');
  }

  fileReset(): void {

    this.csvReader.nativeElement.value = '';
    this.records = [];
    this.fileSelected = null;
  }


}
