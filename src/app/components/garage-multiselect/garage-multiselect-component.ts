import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Garage } from '../../services/garage.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-garage-multiselect',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './garage-multiselect-component.html',
  styleUrls: ['./garage-multiselect-component.scss']
})
export class GarageMultiselectComponent {

  @Input() garages: Garage[] = [];
  selectedGarages: Garage[] = [];

  @Output() selectionChange = new EventEmitter<Garage[]>();
  @Output() loadApiRequested = new EventEmitter<void>();

  updateSelection() {
    this.selectionChange.emit(this.selectedGarages);
  }

  requestApiLoad() {
    this.loadApiRequested.emit();
  }
}
