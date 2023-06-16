import { Component, OnInit } from '@angular/core';
import { CatsService } from 'src/app/services/cats.service';

import { Subject, takeUntil } from 'rxjs';
import { Breed } from 'src/app/models/breed.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit { 

  breeds: Breed[] = [];
  limits = 10;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private catsService: CatsService
  ) {}

  ngOnInit(): void {
    this.getBreeds();
  }

  getBreeds(): void {
    this.catsService.getBreeds().pipe(takeUntil(this.destroy)).subscribe((res: Breed[]) => {
      this.breeds = res;
      console.log(this.breeds);
    })
  }

  setFilters(filters: string[]): void {
    console.log(filters);
  }

}
