import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjDropdown } from './obj-dropdown';

describe('ObjDropdown', () => {
  let component: ObjDropdown;
  let fixture: ComponentFixture<ObjDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
