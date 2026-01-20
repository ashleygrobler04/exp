import { Component, computed, output, signal, Input } from '@angular/core';

@Component({
  selector: 'app-exp-input',
  imports: [],
  templateUrl: './exp-input.html',
  styleUrl: './exp-input.css',
})
export class ExpInput {
  @Input() title: string = "";
  //add output for title so that other components can find it I think?
  expenseTitleOutput = output<string>();

  changeExpenseTitle(event: Event) {
    var elem = event.target as HTMLInputElement;
    //Testing...
    //console.log(elem.value);
    this.expenseTitleOutput.emit(elem.value);
  }

}
