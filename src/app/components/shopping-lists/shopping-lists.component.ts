import { Component, OnInit } from '@angular/core';
import { ShoppingListGetAllService } from '../../services/shopping-list/shopping-list.get-all.service';
import { IShoppingList } from '../../services/shopping-list/shopping-list.interface';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css']
})
export class ShoppingListsComponent implements OnInit {

  createNew = false;

  shoppingLists: Array<IShoppingList> = [];

  constructor(public shoppingListGetAllService: ShoppingListGetAllService) { }

  ngOnInit() {
    this.shoppingListGetAllService.getAll().subscribe(shoppingLists => {
      console.log('shoppingLists', shoppingLists);
      this.shoppingLists = shoppingLists;
    });
  }

  createNewList() {
    this.createNew = true;
  }

  newShoppingListCreated(newListUUID: string) {
    alert('created ' + newListUUID);
  }
}
