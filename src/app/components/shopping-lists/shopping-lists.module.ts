import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListGetService } from '../../services/shopping-list/shopping-list.get.service';
import { NewShoppingListModule } from './new-shopping-list/new-shopping-list.module';
import { ShoppingListsComponent } from "./shopping-lists.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shoppingLists'
  },
  {
    path: 'shoppingLists',
    component: ShoppingListsComponent
  },
  {
    path: 'shoppingLists/:id/items',
    loadChildren: () => import('../shopping-list-item/shopping-list-item.module').then(m => m.ShoppingListItemModule)
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
  providers: [ ShoppingListGetService ]
})
export class ShoppingListsModule { }
