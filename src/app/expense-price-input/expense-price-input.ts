import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-expense-price-input',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './expense-price-input.html',
  styleUrls: ['./expense-price-input.css'],
})
export class ExpensePriceInput {
  @Input() price = 0.0;
  @Output() priceInputOutput = new EventEmitter<number>();

  setPriceInput(event: Event) {
    const ev = event.target as HTMLInputElement;
    this.priceInputOutput.emit(parseFloat(ev.value) || 0);
  }
}
