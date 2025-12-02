import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader-component.html',
  styleUrls: ['./loader-component.scss']
})
export class LoaderComponent {
    // ובתור התחלה זה מוגדר כשקר
  @Input() visible = false;
//   הודעת הבריררית מחדל תיהיה טוען
  @Input() message: string = 'טוען...';
}
