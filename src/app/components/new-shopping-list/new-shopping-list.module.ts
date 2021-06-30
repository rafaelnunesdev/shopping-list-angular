import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewShoppingListComponent } from './new-shopping-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingListAddService } from '../../services/shopping-list/shopping-list.add.service';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  declarations: [ NewShoppingListComponent ],
  exports: [ NewShoppingListComponent ],
  providers: [ ShoppingListAddService ]
})
export class NewShoppingListModule {}