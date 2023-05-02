import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AnimationService } from 'src/modules/common-ui/animation.service';
import { Interests, Principles, Skills, Summary } from '../skill/skill.model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TitleService } from 'src/modules/common-ui/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [AnimationService.fadeInOut]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('generalDescriptionTrigger', { read: ElementRef}) gdTrigger!: ElementRef;
  @ViewChild('generalDescriptionBackground', { read: ElementRef}) gdBackground!: ElementRef;

  @ViewChild('skillList', { read: ElementRef}) skillList!: ElementRef;
  @ViewChild('principleList', { read: ElementRef}) principleList!: ElementRef;
  @ViewChild('interestList', { read: ElementRef}) interestList!: ElementRef;

  public readonly skills: Summary[] = Skills;
  public readonly interests: Summary[] = Interests;
  public readonly principles: Summary[] = Principles;
  
  private readonly onDestroy$: Subject<void> = new Subject<void>();
  constructor(private animation: AnimationService,
              private title: TitleService,
              private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.animation.observeScrollIntersection(this.gdTrigger.nativeElement, this.viewContainer.element.nativeElement, 0.01)
    .pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((value) => {
      if (value === 1) {
        this.title.setTitle('');
      }
      this.gdBackground.nativeElement.style.opacity = value;
    });
    this.animation.observeElements([this.skillList.nativeElement, this.principleList.nativeElement, this.interestList.nativeElement], 0, {root: this.viewContainer.element.nativeElement, threshold: 1})
    .pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((value) => {
      const headerValue: string | null = value.entry.target.getAttribute('header');
      if (headerValue && value.entry.isIntersecting) {
        this.title.setTitle(headerValue);
      }
    })
  }

  ngOnDestroy(): void {
      this.onDestroy$.next();
  }
}
