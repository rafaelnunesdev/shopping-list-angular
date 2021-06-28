import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListsComponent } from "./shopping-lists.component";

const routes: Routes = [
  {
    path: '',
    component: ShoppingListsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  declarations: [ ShoppingListsComponent ],
  exports: [ ShoppingListsComponent ]
})
export class ShoppingListsModule { }
