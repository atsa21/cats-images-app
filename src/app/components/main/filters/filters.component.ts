import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Breed } from 'src/app/models/breed.interface';
import { CatsService } from 'src/app/services/cats.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  breeds: Breed[] = [];
  breedsSelected: Breed[] = [];
  limits: number[] = [10, 20, 40];
  removeFilterSubject: Subject<Breed[]> = new Subject<Breed[]>();
  private destroy: Subject<boolean> = new Subject<boolean>();

  @Output() breedsEmitter = new EventEmitter<Breed[]>();
  @Output() allBreedsEmitter = new EventEmitter<string>();
  @Output() limitSelected = new EventEmitter<number>();

  constructor(private catService: CatsService) {}

  ngOnInit(): void {
    this.getBreeds();
  }

  getBreeds(): void {
    this.catService.getBreeds().pipe(takeUntil(this.destroy)).subscribe((res: Breed[]) => {
      this.breeds = res;
    })
  }

  setBreeds(breedsSelected: Breed[]): void {
    if(breedsSelected.length) {
      this.breedsSelected = breedsSelected;
      this.breedsEmitter.emit(breedsSelected);
    } else {
      this.breedsSelected.length = 0;
      this.allBreedsEmitter.emit();
    }
  }

  setLimit(newLimit: number): void {
    this.limitSelected.emit(newLimit);
  }

  removeBreed(breedId: string): void {
    this.breedsSelected = this.breedsSelected.filter((item: Breed) => item.id !== breedId);
    this.removeFilterSubject.next(this.breedsSelected);
  }

}
