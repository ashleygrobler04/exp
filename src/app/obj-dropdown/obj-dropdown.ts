import { Component, output, signal, Input, OnInit } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-obj-dropdown',
  imports: [],
  templateUrl: './obj-dropdown.html',
  styleUrl: './obj-dropdown.css',
})
export class ObjDropdown implements OnInit {
  c = Category;
  //get A list of all categories
  categories = this.catToList();
  @Input() category: string = this.categories[0];
  //again, attempt to set the output so that it can be shared with all components
  selectedCategoryOutput = output<string>();

  ngOnInit() {
    this.selectedCategoryOutput.emit(this.category);
  }

  catToList() {
    return Object.values(this.c);
  }

  categoryChange(event: Event) {
    var elem = event.target as HTMLSelectElement;
    this.selectedCategoryOutput.emit(elem.value);
  }
}
