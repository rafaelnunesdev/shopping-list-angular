import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { ShoppingListCommandService } from '../../services/shopping-list/shopping-list.command.service';
import { ShoppingListGetService } from '../../services/shopping-list/shopping-list.get.service';
import { IShoppingList, IShoppingListItem } from '../../services/shopping-list/shopping-list.interface';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {

  doneItems?: Observable<Array<IShoppingListItem>>;
  gmailAccountShare = '';
  itemDescription = '';
  pendingItems?: Observable<Array<IShoppingListItem>>;
  sharing = false;
  shoppingListId = '';
  shoppingList?: IShoppingList;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public auth: AuthService,
    public shoppingListGetService: ShoppingListGetService,
    public shoppingListCommandService: ShoppingListCommandService
  ) { }

  ngOnInit(): void {
    this.shoppingListId = this.route.snapshot.paramMap.get('id') ?? '';
    this.shoppingListGetService.getById(this.shoppingListId).subscribe(shoppingList => {
      if (!shoppingList) {
        this.router.navigate(['../']);
      }
      this.shoppingList = shoppingList as IShoppingList;
      this.filterListItems();
    });
  }

  clearNewItem() {
    this.itemDescription = '';
  }

  deleteItem(event: Event, itemId: string) {
    event.stopPropagation();
    this.shoppingListCommandService.deleteItem(this.shoppingListId, itemId).subscribe();
  }

  markItemAsDone(event: Event, itemId: string) {
    event.stopPropagation();
    this.shoppingListCommandService.markItemAsDone(this.shoppingListId, itemId).subscribe();
  }

  markItemAsPending(event: Event, itemId: string) {
    event.stopPropagation();
    this.shoppingListCommandService.markItemAsPending(this.shoppingListId, itemId).subscribe();
  }

  filterListItems() {
    const items: Array<IShoppingListItem> = Object.values(this.shoppingList?.items ?? []);
    this.doneItems = of(items.filter(item => item.done));
    this.pendingItems = of(items.filter(item => !item.done));
  }

  newItem() {
    this.shoppingListCommandService.addItem(this.shoppingListId, this.itemDescription).subscribe(() => this.clearNewItem());
  }

  openShareField() {
    this.sharing = true;
  }

  shareWith() {
    this.shoppingListCommandService.shareWith(this.shoppingListId, this.gmailAccountShare).subscribe(() => {
      this.sharing = false;
    });
  }
}
