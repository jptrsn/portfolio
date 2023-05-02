import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';
import { AnimationService } from 'src/modules/common-ui/animation.service';
import { Summary } from './skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  animations: [AnimationService.fadeInOut]
})
export class SkillComponent implements AfterViewInit, OnDestroy {
  @ViewChild('triggerVisible', {read: ElementRef}) triggerVisible!: ElementRef;
  @ViewChild('triggerHidden', {read: ElementRef}) triggerHidden!: ElementRef;
  @Input() skill!: Summary;

  public animate$: BehaviorSubject<'show' | 'hide'> = new BehaviorSubject<'show' | 'hide'>('hide');
  private OnDestroy$: Subject<void> = new Subject<void>();
  constructor(private animation: AnimationService) {
    
  }

  ngAfterViewInit(): void {
    this.animation.observeElements([this.triggerVisible.nativeElement], 500)
    .pipe(
      takeUntil(this.OnDestroy$),
      filter((value) => this.animation.isIntersecting(value.entry))
    ).subscribe((value) => {
      this.animate$.next('show');
    });
    this.animation.observeElements([this.triggerHidden.nativeElement], 500)
    .pipe(
      takeUntil(this.OnDestroy$),
      // tap((value) => console.log(`${this.skill.title} triggerHidden`, this.animation.isIntersecting(value.entry))),
      filter((value) => !this.animation.isIntersecting(value.entry))
    ).subscribe((value) => {
      this.animate$.next('hide');
    });
  }

  ngOnDestroy(): void {
      
  }

}
