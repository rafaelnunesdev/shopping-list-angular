import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListGetAllService } from '../../services/shopping-list/shopping-list.get-all.service';
import { NewShoppingListModule } from './new-shopping-list/new-shopping-list.module';
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
    FlexLayoutModule,
    MatCardModule,
    NewShoppingListModule
  ],
  declarations: [ ShoppingListsComponent ],
  exports: [ ShoppingListsComponent ],
  providers: [ ShoppingListGetAllService ]
})
export class ShoppingListsModule { }
