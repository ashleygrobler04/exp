import { Component, signal } from '@angular/core';
import { Expense } from './expense/expense';
import { Category } from './category';
import { ObjDropdown } from './obj-dropdown/obj-dropdown';
import { ExpInput } from './exp-input/exp-input';
import { ExpensePriceInput } from './expense-price-input/expense-price-input';
import { IExpense } from './iexpense';
import uuid4 from 'uuid4';

@Component({
  selector: 'app-root',
  imports: [Expense, ObjDropdown, ExpInput, ExpensePriceInput],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title: string = "Exp";
  cat = Category
  expenses: Array<IExpense> = [];
  expenseTitle: string = "";
  expenseCategory: string = "";
  expensePrice: number = 0.0;
  disabled = signal<boolean>(false);
  totalWithoutCat = signal<number>(0);
  shouldFilter= signal<boolean>(false);
  filterValue=signal<string>("");

  /**
   *Kind of try to initialize A component without other methods...
   */
  constructor() {
    this.totalWithoutCat.set(this.GetTotalExpenseCost());
  }

  addExpense() {
    this.expenses.push({ id: uuid4(), category: this.expenseCategory, price: this.expensePrice, title: this.expenseTitle });
    this.totalWithoutCat.set(this.GetTotalExpenseCost());
  }

  setExpenseTitle(title: string) {
    this.expenseTitle = title;
  }

  setCategory(c: string) {
    this.expenseCategory = c;
  }

  setPrice(price: number) {
    this.expensePrice = price;
  }

  deleteExpense(id: string) {
    this.expenses = this.removeExpenseById(id);
    this.totalWithoutCat.set(this.GetTotalExpenseCost());
  }

  //Get the total for all expenses in the list excluding specific categories
  GetTotalExpenseCost(): number {
    var tmp = 0;
    this.expenses.forEach((ex) => {
      tmp += ex.price;
    });
    return tmp;
  }

  //Get the expense total based on category
  TotalWithCat(cat: string): number {
    let tmp = 0;
    this.expenses.forEach((ex) => {
      if (ex.category === cat) {
        tmp += ex.price;
      }
    });
    return tmp;
  }

  removeExpenseById(id: string): Array<IExpense> {
    var filteredItems = this.expenses.filter((e => e.id != id));
    return filteredItems;
  }

  toggleFilter() {
    this.shouldFilter.set(!this.shouldFilter());
    //console.log(`checkbox set to ${this.shouldFilter()}`);
  }

  setFilterValue(fv:string){
    this.filterValue.set(fv);
  }
}
