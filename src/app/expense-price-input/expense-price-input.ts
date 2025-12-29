import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-expense-price-input',
  imports: [],
  templateUrl: './expense-price-input.html',
  styleUrl: './expense-price-input.css',
})
export class ExpensePriceInput {
  priceInput = signal<number>(0.0);
  priceInputOutput=output<number>();

  setPriceInput(event: Event) {
    var ev = event.target as HTMLInputElement;
    this.priceInput.set(parseFloat(ev.value));
    //emit to the rest of the components I think?
    this.priceInputOutput.emit(parseFloat(ev.value));
  }
}
