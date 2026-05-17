import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-exp-input',
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './exp-input.html',
  styleUrls: ['./exp-input.css'],
})
export class ExpInput {
  @Input() title = '';
  @Output() expenseTitleOutput = new EventEmitter<string>();

  changeExpenseTitle(event: Event) {
    const elem = event.target as HTMLInputElement;
    this.expenseTitleOutput.emit(elem.value);
  }
}
