import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url:string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  public getMovies():Observable<any>{
    return this.http.get(this.url + "movies");
  }
  
  public delete(movie:Movie):Observable<any>{
    return this.http.delete(this.url + "movies/" + movie.id);
  }
}
