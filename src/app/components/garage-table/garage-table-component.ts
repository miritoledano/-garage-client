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
  allGarages: Garage[] = []; // שומר את כל הנתונים

  @Input() set garages(value: Garage[]) {
    if (value) {
      this.allGarages = value;
      this.dataSource.data = value; // מתחיל מלא
    }
  }

  @Output() selectionChange = new EventEmitter<Garage[]>(); // שולח בחירה ל-AppComponent

  displayedColumns: string[] = [
    'select', 'misparMosah', 'shemMosah', 'sugMosah', 'ktovet', 'yishuv', 'telephone'
  ];

  dataSource = new MatTableDataSource<Garage>();
  selection: Garage[] = [];

  toggleRow(row: Garage) {
    const index = this.selection.indexOf(row);
    if (index === -1) this.selection.push(row);
    else this.selection.splice(index, 1);

    this.selectionChange.emit(this.selection);
  }

  toggleAll(event: any) {
    if (event.checked) this.selection = [...this.dataSource.data];
    else this.selection = [];

    this.selectionChange.emit(this.selection);
  }

  isAllSelected() {
    return this.selection.length === this.dataSource.data.length && this.selection.length > 0;
  }

  isPartialSelected() {
    return this.selection.length > 0 && this.selection.length < this.dataSource.data.length;
  }
}
