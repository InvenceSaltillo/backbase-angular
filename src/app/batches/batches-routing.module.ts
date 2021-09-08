import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BatchesPageComponent } from './pages/batches-page/batches-page.component';

const routes: Routes = [
  {
    path: '',
    component: BatchesPageComponent,
  },
  { path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class BatchesRoutingModule { }
