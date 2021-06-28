import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ToolbarModule } from '../toolbar/toolbar.module';
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
    ToolbarModule
  ],
  declarations: [ ShoppingListsComponent ],
  exports: [ ShoppingListsComponent ]
})
export class ShoppingListsModule { }
