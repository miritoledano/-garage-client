import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Garage } from '../../services/garage.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-garage-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  templateUrl: './garage-table-component.html',
  styleUrls: ['./garage-table-component.scss']
})
export class GarageTableComponent {
  // קבלת הנתונים מה API
  @Input() set garages(value: Garage[]) {
    if (value) {
      this.dataSource.data = value;
    }
  }

  @Output() selectionChange = new EventEmitter<Garage[]>();
// מערך סדר העמודות 
  displayedColumns: string[] = [
    'select', 'misparMosah', 'shemMosah', 'sugMosah', 'ktovet', 'yishuv', 'telephone'
  ];
// אם אני יעשה פילטר יעזור לי 
  dataSource = new MatTableDataSource<Garage>();
  selection: Garage[] = [];
// אם השורה לא נבחרה מוסיף למערך ומעדכן 
  toggleRow(row: Garage) {
    const index = this.selection.indexOf(row);
    if (index === -1) this.selection.push(row);
    else this.selection.splice(index, 1);

    this.selectionChange.emit(this.selection);
  }
// אם בחר הכול הכול נוסף
  toggleAll(event: any) {
    if (event.checked) this.selection = [...this.dataSource.data];
    else this.selection = [];

    this.selectionChange.emit(this.selection);
  }
// בדיקה האם כל השורות נבחרו
  isAllSelected() {
    return this.selection.length === this.dataSource.data.length && this.selection.length > 0;
  }
// או חלק
  isPartialSelected() {
    return this.selection.length > 0 && this.selection.length < this.dataSource.data.length;
  }
}
