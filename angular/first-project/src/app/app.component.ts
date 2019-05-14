import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'first-project';
  listOfFoods: string[] = ['Sushi', 'Pizza', 'Tacos', 'Burritos'];
  listOfPets: string[] = ['dog', 'cat', 'lizard', 'horse'];

  onClick() {
    console.log('clicked!');
  }
}
