import { Component, input } from '@angular/core';

@Component({
  selector: 'app-expense',
  imports: [],
  templateUrl: './expense.html',
  styleUrl: './expense.css',
})
export class Expense {
  title=input<string>();
  price=input<number>();
  category=input<string>();
}