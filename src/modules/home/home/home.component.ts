import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AnimationService } from 'src/modules/common-ui/animation.service';
import { Interests, Principles, Skills, Summary } from '../skill/skill.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [AnimationService.fadeInOut]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('generalDescriptionTrigger', { read: ElementRef}) animateDescription!: ElementRef;
  @ViewChild('generalDescriptionBackground', { read: ElementRef}) gdBackground!: ElementRef;
  public readonly skills: Summary[] = Skills;
  public readonly interests: Summary[] = Interests;
  public readonly principles: Summary[] = Principles;
  
  private readonly onDestroy$: Subject<void> = new Subject<void>();
  constructor(private animation: AnimationService,
              private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.animation.observeScrollIntersection(this.animateDescription.nativeElement, this.viewContainer.element.nativeElement, 0.01).subscribe((value) => {
      this.gdBackground.nativeElement.style.opacity = value;
    })
  }

  ngOnDestroy(): void {
      this.onDestroy$.next();
  }
}
