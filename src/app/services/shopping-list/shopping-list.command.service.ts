import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { IShoppingList, IShoppingListItem } from './shopping-list.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShoppingListCommandService {

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  addItem(shoppingListId: string, itemDescription: string) {
    const shoppingListItem = this.shoppingListItemFromDescription(itemDescription);

    return from(this.db.object<IShoppingListItem>(`shoppingLists/${shoppingListId}/items/${shoppingListItem.id}`).set(shoppingListItem));
  }

  deleteItem(shoppingListId: string, itemId: string) {
    return from(this.db.object<IShoppingListItem>(`shoppingLists/${shoppingListId}/items/${itemId}`).remove());
  }

  markItemAsDone(shoppingListId: string, itemId: string) {
    return from(this.db.object<IShoppingListItem>(`shoppingLists/${shoppingListId}/items/${itemId}`).update({ done: true }));
  }

  markItemAsPending(shoppingListId: string, itemId: string) {
    return from(this.db.object<IShoppingListItem>(`shoppingLists/${shoppingListId}/items/${itemId}`).update({ done: false }));
  }

  newList(name: string): Observable<string> {
    const shoppingList = this.shoppingListFromName(name);

    return from(this.db.object(`shoppingLists/${shoppingList.id}`).set(shoppingList)).pipe(
      map(() => shoppingList.id)
    );
  }
  
  shoppingListFromName(name: string): IShoppingList {
    return {
      id: uuidv4(),
      name,
      owner: this.auth.user$?.uid as string
    };
  }

  shoppingListItemFromDescription(description: string): IShoppingListItem {
    return {
      id: uuidv4(),
      description,
      done: false
    };
  }
}
