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

  //export expenses
  exportExpenses() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(this.loadExpenses(), null, 2)).then(() => {
        alert("Expenses copied to clipboard");
      }).catch((error) => {
        alert("Failed to export expenses: " + error);
      })
    }
    else {
      alert("This browser does not support the clipboard api.");
    }
  }

  //Import expenses 
  importExpenses() {
    if (!navigator.clipboard) {
      alert("This browser does not support the clipboard api...");
    }
    try {
      navigator.clipboard.readText().then((text) => {
        var data = JSON.parse(text);
        //save it
        localStorage.setItem(this.key,JSON.stringify(data));
        alert("Success, imported expenses. Please refresh to see the changes.");
      }).catch((error)=> {
        alert("Failed to read from clipboard: "+error);
      });
    }
    catch (error) {
      alert("Something went wrong wile importing expenses: " + error);
    }
  }
}
