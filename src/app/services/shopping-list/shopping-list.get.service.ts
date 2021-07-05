import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { forkJoin, from, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../auth/user.interface';
import { IShoppingList } from './shopping-list.interface';

@Injectable()
export class ShoppingListGetService {

  accessibleLists: Observable<Array<IShoppingList>> = this.auth.user.pipe(
    concatMap(user => user ? this.db.object<IUser>(`users/${user?.uid}`).valueChanges() : of(null)),
    concatMap(user => this.getAllById(Object.keys(user?.accessibleLists ?? {})))
  );

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

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