import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Breed } from 'src/app/models/breed.interface';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  @ViewChild('select') select!: MatSelect;
  @Input() breeds!: Breed[];

  filters = new FormControl();
  selectedBreeds: string[] = [];
  allSelected = false;

  @Output() filtersSelected = new EventEmitter<string[]>();

  toggleAllSelection(): void {
    this.allSelected = !this.allSelected;
    this.select.options.forEach((item: MatOption) => this.allSelected ? item.select() : item.deselect());
  }

  toggleOneOption(): void {
    const optionAmount = this.breeds.length + 1;
    if(this.filters.value.length === optionAmount) {
      this.allSelected = true;
      this.select.options.first.select();
    } else {
      this.allSelected = false;
      this.select.options.first.deselect();
      this.filtersSelected.emit(this.filters.value);
    }
  }

}
