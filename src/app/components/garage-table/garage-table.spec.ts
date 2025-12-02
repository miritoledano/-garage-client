import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageTableComponent } from './garage-table-component';

describe('GarageTable', () => {
  let component: GarageTableComponent;
  let fixture: ComponentFixture<GarageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
