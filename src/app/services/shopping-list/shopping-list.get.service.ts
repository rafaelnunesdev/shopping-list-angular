import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { forkJoin, from, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../auth/user.interface';
import { IShoppingList } from './shopping-list.interface';

@Injectable()
export class ShoppingListGetService {

  accessibleLists?: Observable<Array<IShoppingList>>;
  ownedLists?: Observable<Array<IShoppingList>>;

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
  ) {
    this.auth.user.pipe(
      concatMap(user => user ? this.db.object<IUser>(`users/${user?.uid}`).valueChanges() : of(null))
    ).subscribe(user => {
      if (user) {
        this.accessibleLists = this.getAllById(Object.keys(user?.accessibleLists ?? {}));
        this.ownedLists = this.getAllById(Object.keys(user?.ownedLists ?? {}));
      }
    });
  }

  getAllById(shoppingListsIds: Array<string>): Observable<Array<IShoppingList>> {
    return forkJoin(shoppingListsIds.map(id  => {
      return from(this.db.object<IShoppingList>(`shoppingLists/${id}`).query.get()).pipe(
        map(snapshot => snapshot.val() as IShoppingList)
      );
    }));
  }

  getById(id: string): Observable<IShoppingList | null> {
    return this.db.object<IShoppingList>(`shoppingLists/${id}`).valueChanges();
  }
}