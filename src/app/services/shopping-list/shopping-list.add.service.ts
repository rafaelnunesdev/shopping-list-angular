import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { IShoppingList } from './shopping-list.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShoppingListAddService {

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  add(name: string): Observable<string> {
    const shoppingList = this.shoppingListFromName(name);

    return from(this.db.object(`shoppingLists/${shoppingList.id}`).set(shoppingList)).pipe(
      map(() => shoppingList.id)
    );
  }

  shoppingListFromName(name: string): IShoppingList {
    return {
      id: uuidv4(),
      name,
      owner: this.auth.user?.uid as string
    };
  }
}
