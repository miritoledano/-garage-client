import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Garage } from '../../services/garage.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-garage-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './add-button-component.html'
  
})
export class GarageAddButtonComponent {
  @Input() selectedGarages: Garage[] = [];
  @Output() addClicked = new EventEmitter<void>();
  @Input() loading: boolean = false;


  onClick() {
    this.addClicked.emit();
  }
}
