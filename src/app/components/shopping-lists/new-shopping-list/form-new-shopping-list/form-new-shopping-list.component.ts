import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShoppingListCommandService } from '../../../../services/shopping-list/shopping-list.command.service';

@Component({
  selector: 'app-form-new-shopping-list',
  templateUrl: './form-new-shopping-list.component.html',
  styleUrls: ['./form-new-shopping-list.component.css']
})
export class FormNewShoppingListComponent {

  @Output()
  newShoppingListCreated = new EventEmitter<string>();

  name = '';

  constructor(public shoppingListCommandService: ShoppingListCommandService) { }

  done() {
    this.shoppingListCommandService.newList(this.name).subscribe(id => {
      this.newShoppingListCreated.emit(id);
    });
  }
}
