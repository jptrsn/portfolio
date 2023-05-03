import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';
import { AnimationService } from 'src/modules/common-ui/animation.service';
import { Summary } from './skill.model';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  animations: [AnimationService.fadeInOut]
})
export class SkillComponent implements AfterViewInit, OnDestroy {
  @Input() skill!: Summary;
  @ViewChild('card', {read: ElementRef}) card!: ElementRef;
  public animate$: BehaviorSubject<'show' | 'hide'> = new BehaviorSubject<'show' | 'hide'>('hide');
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private animation: AnimationService,
              private viewContainer: ViewContainerRef) {
    
  }

  ngAfterViewInit(): void {
    const threshold: number[] = [];
    for (let i = 0; i <= 1; i += 0.01) {
      threshold.push(i);
    }
    this.animation.observeElements([this.viewContainer.element.nativeElement], 0, {threshold, rootMargin: '-10% 0% -5% 0%'}).pipe(
      takeUntil(this.onDestroy$),
      map(({entry, observer}) => entry.intersectionRatio)
    ).subscribe((value) => {
      // console.log(`${this.skill.title}: ${value}`);
      this.card.nativeElement.style.opacity = value;
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
