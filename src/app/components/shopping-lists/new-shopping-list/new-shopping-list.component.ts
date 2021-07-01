import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-shopping-list',
  templateUrl: './new-shopping-list.component.html',
  styleUrls: ['./new-shopping-list.component.css']
})
export class NewShoppingListComponent {

  @Input()
  shoppingListsCount = 0;

  @Output()
  newShoppingListCreated = new EventEmitter<string>();

  createNew = false;

  createNewList() {
    this.createNew = true;
  }

  emitNewShoppingListCreated(newListUUID: string) {
    this.createNew = false;
    this.newShoppingListCreated.emit(newListUUID);
  }
}
