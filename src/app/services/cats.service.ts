import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Breed } from '../models/breed.interface';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private headers = new HttpHeaders({
    'x-api-key': environment.apiCatsKey
  });

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    const headers = this.headers;
    return this.http.get<Breed[]>('https://api.thecatapi.com/v1/breeds/', { headers });
  }
}
