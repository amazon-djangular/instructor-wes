import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-gold',
  templateUrl: './gold.component.html',
  styleUrls: ['./gold.component.css']
})
export class GoldComponent implements OnInit {
  gold: number = 10;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.gold = this.userService.getUser().gold;
  }

}
