import { Component, input, signal, output } from '@angular/core';
import { IExpense } from '../iexpense';

@Component({
  selector: 'app-expense',
  imports: [],
  templateUrl: './expense.html',
  styleUrl: './expense.css',
})
export class Expense {
  id = input<string>();
  title = input<string>();
  price = input<number>();
  category = input<string>();

  expenseUpdated = output<IExpense>();

  editing = signal(false);
  editTitle = signal('');
  editPrice = signal(0);
  editCategory = signal('');

  startEdit() {
    this.editTitle.set(this.title() ?? '');
    this.editPrice.set(this.price() ?? 0);
    this.editCategory.set(this.category() ?? '');
    this.editing.set(true);
  }

  cancelEdit() {
    this.editing.set(false);
  }

  setEditTitle(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.editTitle.set(v);
  }

  setEditPrice(event: Event) {
    const v = parseFloat((event.target as HTMLInputElement).value);
    this.editPrice.set(isNaN(v) ? 0 : v);
  }

  setEditCategory(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.editCategory.set(v);
  }

  saveEdit() {
    const updated: IExpense = {
      id: this.id() ?? '',
      title: this.editTitle(),
      price: this.editPrice(),
      category: this.editCategory(),
    };
    this.expenseUpdated.emit(updated);
    this.editing.set(false);
  }
}