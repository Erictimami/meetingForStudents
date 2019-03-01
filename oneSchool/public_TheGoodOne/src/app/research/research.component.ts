import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  @Input() researchToShow: any;  // use the @Input decorator to indicate this comes from the parent
  constructor() { }
  ngOnInit() {
  }

}
