import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageMultiselectComponent } from './garage-multiselect-component';

describe('GarageMultiselect', () => {
  let component: GarageMultiselectComponent;
  let fixture: ComponentFixture<GarageMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageMultiselectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageMultiselectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
