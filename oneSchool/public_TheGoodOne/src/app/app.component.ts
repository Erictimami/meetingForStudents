import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  //declare the variables here
  // title = "Let's eat";
  // movies= [];
  // detail=[];
  // newMovie: any;
  // newReview: any
  // messageErrors: [];
  constructor(private _httpService: HttpService){}

  //ngOnInit will run when the componnent is initialized after the constructor method.
  ngOnInit(){
    // this.getFindOneMovieFromService(id);
    // this.getMovies();
    // this.newMovie = {name: ''};
    // this.newMovie = null;
  }
  
}
