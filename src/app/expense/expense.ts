import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IExpense } from '../iexpense';

@Component({
  standalone: true,
  selector: 'app-expense',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './expense.html',
  styleUrls: ['./expense.css'],
})
export class Expense {
  @Input() id = '';
  @Input() title = '';
  @Input() price = 0;
  @Input() category = '';

  @Output() expenseUpdated = new EventEmitter<IExpense>();

  editing = false;
  editTitle = '';
  editPrice = 0;
  editCategory = '';

  startEdit() {
    this.editTitle = this.title;
    this.editPrice = this.price;
    this.editCategory = this.category;
    this.editing = true;
  }

  cancelEdit() {
    this.editing = false;
  }

  setEditTitle(event: Event) {
    this.editTitle = (event.target as HTMLInputElement).value;
  }

  setEditPrice(event: Event) {
    const v = parseFloat((event.target as HTMLInputElement).value);
    this.editPrice = isNaN(v) ? 0 : v;
  }

  setEditCategory(event: Event) {
    this.editCategory = (event.target as HTMLInputElement).value;
  }

  saveEdit() {
    const updated: IExpense = {
      id: this.id,
      title: this.editTitle,
      price: this.editPrice,
      category: this.editCategory,
    };
    this.expenseUpdated.emit(updated);
    this.editing = false;
  }
}