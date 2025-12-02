import { Component, NgZone } from '@angular/core';
import { Garage, GarageService } from './services/garage.service';
import { GarageTableComponent } from './components/garage-table/garage-table-component';
import { GarageMultiselectComponent } from './components/garage-multiselect/garage-multiselect-component';
import { GarageAddButtonComponent } from './components/add-button/add-button-component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoaderComponent } from './components/Garage-loader/loader-component';
import { lastValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    GarageTableComponent,
    GarageMultiselectComponent,
    GarageAddButtonComponent,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    LoaderComponent
  ],
  templateUrl: './app-component.html',
  styleUrls: ['./app-component.scss']
})
export class AppComponent {
  garagesFromApi: Garage[] = [];
  garagesFromDb: Garage[] = [];
  selectedGarages: Garage[] = [];

  loading = false; // Loader בעת הוספה למסד
  loadingApi = false; // Loader בעת שליפת מוסכים מה-API
  loadingDb = false;  // Loader בעת שליפת מוסכים מה-DB

  notification: { message: string; type: 'success' | 'error' } | null = null;

  constructor(
    private garageService: GarageService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Loader DB אוטומטי
    this.loadingDb = true;
    this.cdr.detectChanges();

    this.garageService.getAllGarages().subscribe({
      next: dbData => this.ngZone.run(() => {
        this.garagesFromDb = dbData;
        this.loadingDb = false;
        this.cdr.detectChanges();
      }),
      error: err => this.ngZone.run(() => {
        this.showNotification('שגיאה בטעינת מוסכים מהמסד', 'error');
        this.loadingDb = false;
        this.cdr.detectChanges();
      })
    });

    // Loader API אוטומטי
    this.loadGaragesFromApi();
  }

  loadGaragesFromApi() {
    this.loadingApi = true;
    this.cdr.detectChanges();
    this.garageService.fetchAndSaveFromApi().subscribe({
      next: apiData => this.ngZone.run(() => {
        this.garagesFromApi = apiData;
        this.loadingApi = false;
        this.cdr.detectChanges();
      }),
      error: err => this.ngZone.run(() => {
        console.error(err);
        this.loadingApi = false;
        this.showNotification('שגיאה בטעינת מוסכים מה-API', 'error');
        this.cdr.detectChanges();
      })
    });
  }

  onSelectionChange(selected: Garage[]) {
    this.selectedGarages = selected;
  }

  async onAddSelected() {
    if (this.selectedGarages.length === 0) {
      this.showNotification('לא נבחרו מוסכים להוספה', 'error');
      return;
    }

    const garagesToAdd = this.selectedGarages.filter(
      g => !this.garagesFromDb.some(x => x.misparMosah === g.misparMosah)
    );

    if (garagesToAdd.length === 0) {
      this.showNotification('כל המוסכים שבחרת כבר קיימים במסד', 'error');
      return;
    }

    this.loading = true;
    this.notification = null;
    this.cdr.detectChanges();

    try {
      await lastValueFrom(this.garageService.addSelectedGarages(garagesToAdd));
      this.ngZone.run(() => {
        this.garagesFromDb = [...this.garagesFromDb, ...garagesToAdd];
        this.selectedGarages = [];
        this.showNotification('נוסף בהצלחה!', 'success');
        this.loading = false;
        this.cdr.detectChanges();
      });
    } catch (err) {
      console.error(err);
      this.ngZone.run(() => {
        this.showNotification('שגיאה בהוספה למסד', 'error');
        this.loading = false;
        this.cdr.detectChanges();
      });
    }
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };
    this.cdr.detectChanges();
    setTimeout(() => this.notification = null, 4000);
  }
}
