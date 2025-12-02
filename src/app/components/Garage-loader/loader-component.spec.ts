import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader-component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent, MatProgressSpinnerModule] // טוענים את הקומפוננטה והספריה של ה-spinner
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // בודק שהקומפוננטה נוצרה
  });

  it('should display the spinner when visible is true', () => {
    component.visible = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeTruthy(); // אם visible=true, ה-spinner מוצג
  });

  it('should not display the spinner when visible is false', () => {
    component.visible = false;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeFalsy(); // אם visible=false, אין spinner
  });

  it('should display the correct message', () => {
    component.visible = true;
    component.message = 'טוען נתונים...';
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toBe('טוען נתונים...');
  });
});
