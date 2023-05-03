import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimationService } from 'src/modules/common-ui/animation.service';
import { TitleService } from 'src/modules/common-ui/title.service';
import { Interests, Principles, Skills, Summary } from '../skill/skill.model';

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

  private componentElements: Map<string, ElementRef> = new Map();
  
  private readonly onDestroy$: Subject<void> = new Subject<void>();
  constructor(private animation: AnimationService,
              private title: TitleService,
              private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    this.animation.scrollToComponent$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((componentName) => {
      const el = this.componentElements.get(componentName);
      if (el) {
        el.nativeElement.scrollIntoView({block: "center", inline: "nearest"});
      }
    })
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
    this._initComponentMap();
  }

  ngOnDestroy(): void {
      this.onDestroy$.next();
  }

  private _initComponentMap(): void {
    for (let entry of [
      ['skillList', this.skillList],
      ['principleList', this.principleList],
      ['interestList', this.interestList]
    ]) {
      
    }
    this.componentElements.set('skillList', this.skillList);
    this.componentElements.set('principleList', this.principleList);
    this.componentElements.set('interestList', this.interestList);
  }
}
