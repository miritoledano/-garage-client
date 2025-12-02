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
    //  משדר אירוע להורה כשהכפתור נלחץ → מפעיל את פעולת ההוספה למסד

  @Output() addClicked = new EventEmitter<void>();
  // מצב טעינה מוגדר ברגע שנילחץ יהפוך לאמת
  @Input() loading: boolean = false;

// נשלח לאבא פונקצית הוספה כדי שיוסיף לדאהבייס
  onClick() {
    this.addClicked.emit();
  }
}
