import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimationService } from 'src/modules/common-ui/animation.service';
import { Interests, Principles, Skills, Summary } from '../skill/skill.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [AnimationService.fadeInOut]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly skills: Summary[] = Skills;
  public readonly interests: Summary[] = Interests;
  public readonly principles: Summary[] = Principles;
  
  private readonly onDestroy$: Subject<void> = new Subject<void>();
  constructor() {}

  ngOnInit(): void {
      
  }

  ngAfterViewInit(): void {
      
  }

  ngOnDestroy(): void {
      this.onDestroy$.next();
  }
}