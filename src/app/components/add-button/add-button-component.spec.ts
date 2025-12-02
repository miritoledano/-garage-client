import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageAddButtonComponent } from './add-button-component';

describe('AddButton', () => {
  let component: GarageAddButtonComponent;
  let fixture: ComponentFixture<GarageAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageAddButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageAddButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
