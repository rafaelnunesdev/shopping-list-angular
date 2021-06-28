import { AfterViewInit, Component } from '@angular/core';
import { IShoppingList, ShoppingListGetAllService } from '../../services/shopping-list/shopping-list.get-all.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css']
})
export class ShoppingListsComponent implements AfterViewInit {

  initialized = false;

  shoppingLists: Array<IShoppingList> = [];

  constructor(public shoppingListGetAllService: ShoppingListGetAllService) { }

  ngAfterViewInit() {
    this.initialized = false;

    this.shoppingListGetAllService.get().subscribe(shoppingLists => {
      this.shoppingLists = shoppingLists;
      this.initialized = true;
    });
  }
}
