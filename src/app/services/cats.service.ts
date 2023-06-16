import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Breed } from '../models/breed.interface';
import { Cat } from '../models/cat.interface';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private headers = new HttpHeaders({
    'x-api-key': environment.apiCatsKey
  });
  private url = 'https://api.thecatapi.com/v1/';

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    const headers = this.headers;
    return this.http.get<Breed[]>(`${this.url}breeds/`, { headers });
  }

  getAllCats(limit: number): Observable<Cat[]> {
    const headers = this.headers;
    let query_params = {
      limit: limit
    }
    return this.http.get<Cat[]>(`${this.url}images/search`, {headers, params: query_params});
  }

  getCatsByBreeds(limit: number, selectedBreed: string[]): Observable<Cat[]> {
    const headers = this.headers;
    let query_params = {
      limit: limit,
      breed_ids: selectedBreed.join()
    }
    return this.http.get<Cat[]>(`${this.url}images/search`, {headers, params: query_params});
  }
}
