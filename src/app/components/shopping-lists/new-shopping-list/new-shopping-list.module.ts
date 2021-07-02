import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewShoppingListComponent } from './new-shopping-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingListCommandService } from '../../../services/shopping-list/shopping-list.command.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormNewShoppingListComponent } from './form-new-shopping-list/form-new-shopping-list.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  declarations: [ NewShoppingListComponent, FormNewShoppingListComponent ],
  exports: [ NewShoppingListComponent ],
  providers: [ ShoppingListCommandService ]
})
export class NewShoppingListModule {}