import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../interfaces/movie';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  

  url:string = "http://localhost:8000/api/";

  constructor(private http: HttpClient,private authService:AuthService) { }

  public getMovies():Observable<any>{
    return this.http.get(this.url + "movies");
  }
  
  public delete(movie:Movie):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('responseType', 'text')
    .set('Authorization',  'Bearer ' + this.authService.getAuthToken());
    return this.http.delete(this.url + "movies/" + movie.id,{ headers: headers });
  }

  updateAMount(m:Movie):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('responseType', 'text')
    .set('Authorization',  'Bearer ' + this.authService.getAuthToken());
    return this.http.put(this.url + "movies/" +m.id, {"amount":m.amount},{ headers: headers });
  }
}
