import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-yay',
  templateUrl: './yay.component.html',
  styleUrls: ['./yay.component.css']
})
export class YayComponent implements OnInit {
  shouldDisplay: boolean = false;
  task: object;
  @Input() data: string;

  constructor() { }

  ngOnInit() {
  }

}
