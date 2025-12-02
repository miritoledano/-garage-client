import { Component, NgZone } from '@angular/core';
import { Garage, GarageService } from './services/garage.service';
import { GarageTableComponent } from './components/garage-table/garage-table-component';
import { GarageMultiselectComponent } from './components/garage-multiselect/garage-multiselect-component';
import { GarageAddButtonComponent } from './components/add-button/add-button-component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    GarageTableComponent,
    GarageMultiselectComponent,
    GarageAddButtonComponent,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  templateUrl: './app-component.html',
  styleUrls: ['./app-component.scss']
})
export class AppComponent {

  garagesFromApi: Garage[] = [];
  garagesFromDb: Garage[] = [];
  selectedGarages: Garage[] = [];

  loading = false;      // טעינה בעת הוספה למסד
  loadingApi = false;   // טעינה בעת שליפת מוסכים מה-API

  notification: { message: string; type: 'success' | 'error' } | null = null;

  constructor(
    private garageService: GarageService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // שליפה מהמסד בלבד בטעינת הדף
    this.garageService.getAllGarages().subscribe({
      next: dbData => this.garagesFromDb = dbData,
      error: err => {
        console.error(err);
        this.showNotification('שגיאה בטעינת מוסכים מהמסד', 'error');
      }
    });
  }

  // מופעל רק כשלוחצים על "בחירת מוסכים"
  loadGaragesFromApi() {
    this.loadingApi = true;

    this.garageService.fetchAndSaveFromApi().subscribe({
      next: apiData => {
        setTimeout(() => {
          this.garagesFromApi = apiData;
          this.loadingApi = false;
        }, 500);
      },
      error: err => {
        console.error(err);
        this.loadingApi = false;
        this.showNotification('שגיאה בטעינת מוסכים מה-API', 'error');
      }
    });
  }

  onSelectionChange(selected: Garage[]) {
    this.selectedGarages = selected;
  }

  onAddSelected() {
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

    this.garageService.addSelectedGarages(garagesToAdd).subscribe({
      next: () => {
        setTimeout(() => {
          this.garagesFromDb = [...this.garagesFromDb, ...garagesToAdd];
          this.selectedGarages = [];
          this.loading = false;
          this.showNotification('נוסף בהצלחה!', 'success');
        }, 500);
      },
      error: err => {
        console.error(err);
        this.loading = false;
        this.showNotification('שגיאה בהוספה למסד', 'error');
      }
    });
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };
    setTimeout(() => this.notification = null, 4000);
  }
}
