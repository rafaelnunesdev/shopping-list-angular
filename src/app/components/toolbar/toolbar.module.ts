import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: ToolbarComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [ ToolbarComponent ],
  exports: [ ToolbarComponent ]
})
export class ToolbarModule { }
