import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShoppingListAddService } from '../../services/shopping-list/shopping-list.add.service';

@Component({
  selector: 'app-new-shopping-list',
  templateUrl: './new-shopping-list.component.html',
  styleUrls: ['./new-shopping-list.component.css']
})
export class NewShoppingListComponent {

  @Output()
  newShoppingListCreated = new EventEmitter<string>();

  name = '';

  constructor(public shoppingListAddService: ShoppingListAddService) { }

  done() {
    this.shoppingListAddService.add(this.name).subscribe(id => {
      this.newShoppingListCreated.emit(id);
    });
  }
}
