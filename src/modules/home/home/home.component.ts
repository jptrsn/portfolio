import { Component } from '@angular/core';
import { Skills, Summary } from '../skill/skill.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public readonly skills: Summary[] = Skills;
}
