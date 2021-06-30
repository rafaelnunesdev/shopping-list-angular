import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { IShoppingList } from './shopping-list.interface';

@Injectable()
export class ShoppingListGetAllService {

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  getAll(): Observable<Array<IShoppingList>> {
    return this.db.list<IShoppingList>('shoppingLists').snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }) as IShoppingList))
    );
  }
}