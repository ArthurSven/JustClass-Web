// toast.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {

  @Input() show = false;
  @Input() message = '';
  @Input() type: 'success' | 'error' = 'success';

}
