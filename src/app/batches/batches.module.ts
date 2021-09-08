import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchesPageComponent } from './pages/batches-page/batches-page.component';
import { BatchesRoutingModule } from './batches-routing.module';



@NgModule({
  declarations: [
    BatchesPageComponent,
  ],
  imports: [
    CommonModule,
    BatchesRoutingModule,
  ]
})
export class BatchesModule { }
