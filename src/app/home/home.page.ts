import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  movies:Movie[] = new Array();
  constructor(private movieService:MovieService){}

  ngOnInit(): void {
    this.loadData();
  }

  
  public loadData(){
    console.log("Usao ovde");
    this.movieService.getMovies().subscribe((res)=>{console.log(res);this.movies = res.data;console.log(this.movies);});
    
  }
  removeMovie(m:Movie){
    console.log(m);
    this.movies.forEach((element,index)=>{
      if(element.id==m.id) this.movies.splice(index,1);
   });
   
  }

}
