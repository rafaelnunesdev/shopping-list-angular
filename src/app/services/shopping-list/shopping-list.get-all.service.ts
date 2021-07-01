import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IShoppingList } from './shopping-list.interface';

@Injectable()
export class ShoppingListGetAllService {

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  getAll(): Observable<Array<IShoppingList>> {
    return this.db.list<IShoppingList>('shoppingLists').valueChanges();
  }
}