import { Component, computed, inject, signal, OnInit } from '@angular/core'; // Added imports for Component, inject, and signal
import { Expense } from './expense/expense';
import { Category } from './category';
import { ObjDropdown } from './obj-dropdown/obj-dropdown';
import { ExpInput } from './exp-input/exp-input';
import { ExpensePriceInput } from './expense-price-input/expense-price-input';
import { IExpense } from './iexpense';
import uuid4 from 'uuid4';
import { ExpenseStorageService } from './expense-storage-service';

@Component({
  selector: 'app-root',
  imports: [Expense, ObjDropdown, ExpInput, ExpensePriceInput],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title: string = "Exp";
  private storage = inject(ExpenseStorageService);
  cat = Category
  expenses = signal<Array<IExpense>>([]);
  expenseTitle: string = "";
  expenseCategory: string = Object.values(Category)[0];
  expensePrice: number = 0.0;
  disabled = signal<boolean>(false);
  totalWithoutCat = computed(() => this.GetTotalExpenseCost());
  shouldFilter = signal<boolean>(false);
  filterValue = signal<string>("");

  /**
   *Kind of try to initialize A component without other methods...
   */
  constructor() {
    // Load expenses in ngOnInit
  }

  addExpense() {
    if (this.expenseTitle === "" || this.expensePrice <= 0) {
      alert("Please ensure both price and title is set");
      return;
    }
    const newExpense = { id: uuid4(), category: this.expenseCategory, price: this.expensePrice, title: this.expenseTitle };
    this.expenses.set([...this.expenses(), newExpense]);
    this.storage.saveExpenses(this.expenses());
    // Clear the fields
    this.expenseTitle = "";
    this.expenseCategory = Object.values(this.cat)[0];
    this.expensePrice = 0.0;
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
    const filtered = this.expenses().filter(e => e.id !== id);
    this.expenses.set(filtered);
    this.storage.saveExpenses(this.expenses());
  }

  //Get the total for all expenses in the list excluding specific categories
  GetTotalExpenseCost(): number {
    var tmp = 0;
    this.expenses().forEach((ex) => {
      tmp += ex.price;
    });
    return tmp;
  }

  //Get the expense total based on category
  TotalWithCat(cat: string): number {
    let tmp = 0;
    this.expenses().forEach((ex) => {
      if (ex.category === cat) {
        tmp += ex.price;
      }
    });
    return tmp;
  }

  toggleFilter() {
    this.shouldFilter.set(!this.shouldFilter());
    //console.log(`checkbox set to ${this.shouldFilter()}`);
  }

  setFilterValue(fv: string) {
    this.filterValue.set(fv);
  }

  ngOnInit() {
    const loadedExpenses = this.storage.loadExpenses();
    this.expenses.set(loadedExpenses);
  }

  visibleExpenses = computed((): Array<IExpense> => {
    if (!this.shouldFilter()) {
      return this.expenses();
    }

    return this.expenses().filter(
      e => e.category === this.filterValue()
    );
  });

  //The export button
  onExportClick() {
    this.storage.exportExpenses();
  }

  //import button
  onImportClick() {
    this.storage.importExpenses();
  }

  updateExpense(updated: IExpense) {
    const idx = this.expenses().findIndex(e => e.id === updated.id);
    if (idx === -1) return;
    const arr = [...this.expenses()];
    arr[idx] = updated;
    this.expenses.set(arr);
    this.storage.saveExpenses(this.expenses());
  }
}
