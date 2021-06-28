import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IShoppingList {
  name: string;
}

@Injectable()
export class ShoppingListGetAllService {

  shoppingLists: Array<IShoppingList> = [
    { name: 'Grocery store' }, { name: 'Drug store' }
  ];

  get(): Observable<Array<IShoppingList>> {
    return of(this.shoppingLists);
  }
}