import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListsComponent } from "./shopping-lists.component";

const routes: Routes = [
  {
    path: '',
    component: ShoppingListsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [ ShoppingListsComponent ],
  exports: [ ShoppingListsComponent ]
})
export class ShoppingListsModule { }
