import { Component, OnInit } from '@angular/core';
import { CatsService } from 'src/app/services/cats.service';

import { Subject, takeUntil } from 'rxjs';
import { Cat } from 'src/app/models/cat.interface';
import { Breed } from 'src/app/models/breed.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit { 

  cats: Cat[] = [];
  limits: number[] = [10, 20, 40];
  limit = 10;
  breedsSelected: Breed[] | null = null;
  isLoading = false;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private catsService: CatsService) {}

  ngOnInit(): void {
    this.getAllCats();
  }

  setBreed(filters: Breed[]): void {
    this.breedsSelected = filters;
    this.getCatsImages();
  }

  allBreedsSelected(): void {
    this.breedsSelected = null;
    this.getAllCats();
  }

  setLimit(newLimit: number): void {
    this.limit = newLimit;
    this.getCatsImages();
  }

  getCatsImages(): void {
    this.breedsSelected ? this.getCatsByBreeds() : this.getAllCats();
  }

  getAllCats(): void {
    this.isLoading = true;
    this.catsService.getAllCats(this.limit).pipe(takeUntil(this.destroy)).subscribe((res: any) => {
      this.cats = res;
      this.isLoading = false;
    })
  }

  getCatsByBreeds() : void {
    if(this.breedsSelected) {
      this.isLoading = true;
      const breedsSelectedIds = this.breedsSelected.map(el => el.id);
      this.catsService.getCatsByBreeds(this.limit, breedsSelectedIds).pipe(takeUntil(this.destroy)).subscribe((res: any) => {
        this.cats = res;
        this.isLoading = false;
      })
    }
  }
}
