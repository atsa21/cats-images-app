import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Breed } from 'src/app/models/breed.interface';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-breeds-filters',
  templateUrl: './breeds-filters.component.html',
  styleUrls: ['./breeds-filters.component.scss']
})
export class BreedsFiltersComponent {

  @ViewChild('select') select!: MatSelect;
  @Input() breeds!: Breed[];

  filteredBreeds!: Breed[];
  filtersControl = new FormControl();
  breedsSelected: Breed[] = [];
  breedsSelectedIds: string[] = [];

  @Output() breedsEmit = new EventEmitter<Breed[]>();

  filterPredictions(): void {
    this.filteredBreeds = this.breeds.filter((item: Breed) => item.name.toLowerCase().includes(this.filtersControl.value));
  }

  selectAll(): void {
    this.breedsSelected.length = 0;
    this.filteredBreeds = this.breeds;
    this.filtersControl.reset();
    this.breedsEmit.emit(this.breedsSelected);
  }

  selectBreed(): void {
    this.breedsSelected.push(this.filtersControl.value);
    this.filtersControl.reset();
    this.breedsEmit.emit(this.breedsSelected);
    console.log(this.breedsSelected);
  }

  isChecked(breed: Breed): boolean {
    return !!this.breedsSelected.find((item: Breed) => item.id === breed.id);
  }

}
