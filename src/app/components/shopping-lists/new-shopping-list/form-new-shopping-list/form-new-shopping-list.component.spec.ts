import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewShoppingListComponent } from './form-new-shopping-list.component';

describe('FormNewShoppingListComponent', () => {
  let component: FormNewShoppingListComponent;
  let fixture: ComponentFixture<FormNewShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNewShoppingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
