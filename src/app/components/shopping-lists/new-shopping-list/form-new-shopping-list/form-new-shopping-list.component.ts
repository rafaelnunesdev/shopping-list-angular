import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShoppingListAddService } from '../../../../services/shopping-list/shopping-list.add.service';

@Component({
  selector: 'app-form-new-shopping-list',
  templateUrl: './form-new-shopping-list.component.html',
  styleUrls: ['./form-new-shopping-list.component.css']
})
export class FormNewShoppingListComponent {

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
