import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchesPageComponent } from './pages/batches-page/batches-page.component';
import { BatchesRoutingModule } from './batches-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyCurrencyPipe } from './pages/batches-page/pipes/my-currency.pipe';

@NgModule({
  declarations: [
    BatchesPageComponent,
    MyCurrencyPipe
  ],
  imports: [
    CommonModule,
    BatchesRoutingModule,
    NgbModule,
  ]
})
export class BatchesModule { }
