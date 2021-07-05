import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListGetService } from '../../services/shopping-list/shopping-list.get.service';
import { IShoppingList } from '../../services/shopping-list/shopping-list.interface';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css']
})
export class ShoppingListsComponent implements OnInit, OnDestroy {

  shoppingLists: Array<IShoppingList> = [];
  getAllSubscription?: Subscription;

  constructor(
    public router: Router,
    public shoppingListGetService: ShoppingListGetService
  ) { }

  ngOnInit() {
    this.getAllSubscription = this.shoppingListGetService.accessibleLists.subscribe(shoppingLists => {
      console.log('shoppingLists', shoppingLists);
      this.shoppingLists = shoppingLists;
    });
  }

  ngOnDestroy() {
    this.getAllSubscription?.unsubscribe();
  }

  newShoppingListCreated(newListUUID: string) {
    this.router.navigate([newListUUID, 'items']);
  }
}
