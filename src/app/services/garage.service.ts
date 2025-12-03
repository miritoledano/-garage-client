import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Garage {
  misparMosah: number;
  shemMosah: string;
  codSugMosah: number;
  sugMosah: string;
  ktovet?: string;
  yishuv?: string;
  telephone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private apiUrl = 'https://localhost:44364/api/Garages';

  constructor(private http: HttpClient) {}

  // 1. שולף את כל המוסכים מה-API ושומר במסד
  fetchAndSaveFromApi(): Observable<Garage[]> {
    return this.http.get<Garage[]>(`${this.apiUrl}/FetchAndSaveFromApi`);
  }

  // 2. שולף את כל המוסכים שנשמרו במסד
  getAllGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(`${this.apiUrl}/GetAllGarages`);
  }

  // 3. הוספה בודדת של מוסך
  // הדרך לעבוד עם םעולות אסינכורניות
  addGarage(garage: Garage): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddGarage`, garage);
  }
// 4. הוספה של רשימת מוסכים (עם ולידציה בשרת)
addSelectedGarages(selectedGarages: Garage[]): Observable<any> {
  return this.http.post(`${this.apiUrl}/AddSelectedGarages`, selectedGarages);
}
}