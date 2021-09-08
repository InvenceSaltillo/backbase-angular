import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchesModule } from './batches/batches.module';

const routes: Routes = [
  {
    path: 'batches',
    loadChildren: () => import('./batches/batches.module').then(m => m.BatchesModule),
  },
  {
    path: '**',
    redirectTo: 'batches',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
