import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { IShoppingList, IShoppingListItem } from './shopping-list.interface';
import { v4 as uuidv4 } from 'uuid';
import { Md5 } from 'ts-md5';

@Injectable()
export class ShoppingListCommandService {

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  addItem(shoppingListId: string, itemDescription: string): Observable<void> {
    const shoppingListItem = this.shoppingListItemFromDescription(itemDescription);

    return from(this.db.object<IShoppingListItem>(`shoppingLists/${shoppingListId}/items/${shoppingListItem.id}`).set(shoppingListItem));
  }

  deleteItem(shoppingListId: string, itemId: string): Observable<void> {
    return from(this.db.object<IShoppingListItem>(`shoppingLists/${shoppingListId}/items/${itemId}`).remove());
  }

  markItemAsDone(shoppingListId: string, itemId: string): Observable<void> {
    return from(this.db.object<IShoppingListItem>(`shoppingLists/${shoppingListId}/items/${itemId}`).update({ done: true }));
  }

  markItemAsPending(shoppingListId: string, itemId: string): Observable<void> {
    return from(this.db.object<IShoppingListItem>(`shoppingLists/${shoppingListId}/items/${itemId}`).update({ done: false }));
  }

  newList(name: string): Observable<string> {
    const shoppingList = this.shoppingListFromName(name);

    return from(this.db.object(`shoppingLists/${shoppingList.id}`).set(shoppingList)).pipe(
      concatMap(() => from(this.db.object(`users/${shoppingList.owner}/accessibleLists/${shoppingList.id}`).set(true))),
      map(() => shoppingList.id)
    );
  }

  shareWith(shoppingListId: string, gmailAccount: string): Observable<void> {
    const hash = Md5.hashStr(gmailAccount);
    return from(this.db.object(`pendingSharing/${hash}/${shoppingListId}`).set(true));
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
