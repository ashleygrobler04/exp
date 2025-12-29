import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePriceInput } from './expense-price-input';

describe('ExpensePriceInput', () => {
  let component: ExpensePriceInput;
  let fixture: ComponentFixture<ExpensePriceInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensePriceInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensePriceInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
