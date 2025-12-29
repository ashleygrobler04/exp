import { Injectable } from "@angular/core";
import { IExpense } from "./iexpense";


@Injectable({
  providedIn: 'root',
})
export class ExpenseStorageService {
  private readonly key = "Expenses";

  saveExpenses(expenses: IExpense[]): void {
    localStorage.setItem(this.key, JSON.stringify(expenses));
  }

  loadExpenses(): IExpense[] {
    const data = localStorage.getItem(this.key);
    if (!data) return [];
    try {
      return JSON.parse(data) as IExpense[];
    } catch {
      console.error("Failed to parse expenses from localStorage.");
      return [];
    }
  }

  // Optional helper
  clearExpenses(): void {
    localStorage.removeItem(this.key);
  }
}
