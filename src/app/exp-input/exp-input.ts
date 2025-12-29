import { Component, computed, output, signal } from '@angular/core';

@Component({
  selector: 'app-exp-input',
  imports: [],
  templateUrl: './exp-input.html',
  styleUrl: './exp-input.css',
})
export class ExpInput {
  expenseTitle = signal<string>("");
  //add output for title so that other components can find it I think?
  expenseTitleOutput = output<string>();

  changeExpenseTitle(event: Event) {
    var elem = event.target as HTMLInputElement;
    this.expenseTitle.set(elem.value);
    //Testing...
    //console.log(this.expenseTitle());
    this.expenseTitleOutput.emit(elem.value);
  }

}
