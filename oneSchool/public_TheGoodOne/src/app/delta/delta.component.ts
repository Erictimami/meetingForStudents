import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-delta',
  templateUrl: './delta.component.html',
  styleUrls: ['./delta.component.css']
})
export class DeltaComponent implements OnInit {

  // we can declare the variables that we gonna use here. the variables which gonna contains the data for displaying
 // we don't have a special thing to do here because it's the final html page with not data from db on it.
  constructor(private _httpService: HttpService){} // injection

  ngOnInit() {
    // inititalisation of some variables here

    //call the function here that we want it to run when we open this page gamma 
    
  }

}