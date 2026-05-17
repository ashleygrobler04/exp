import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../category';

@Component({
  standalone: true,
  selector: 'app-obj-dropdown',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './obj-dropdown.html',
  styleUrls: ['./obj-dropdown.css'],
})
export class ObjDropdown implements OnInit {
  c = Category;
  categories = this.catToList();
  @Input() category = this.categories[0] ?? '';
  @Output() selectedCategoryOutput = new EventEmitter<string>();

  ngOnInit() {
    if (!this.category && this.categories.length > 0) {
      this.category = this.categories[0] ?? '';
    }
  }

  catToList() {
    return Object.values(this.c);
  }

  categoryChange(event: Event) {
    const elem = event.target as HTMLSelectElement;
    this.selectedCategoryOutput.emit(elem.value);
  }
}
