import { Component, Input } from '@angular/core';
import { Summary } from './skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  @Input() skill!: Summary;
}
