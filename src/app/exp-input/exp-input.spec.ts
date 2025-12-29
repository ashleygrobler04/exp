import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpInput } from './exp-input';

describe('ExpInput', () => {
  let component: ExpInput;
  let fixture: ComponentFixture<ExpInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
