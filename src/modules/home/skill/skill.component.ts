import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { AnimationService } from 'src/modules/common-ui/animation.service';
import { Summary } from './skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  animations: [AnimationService.fadeInOut]
})
export class SkillComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollElement', {read: ElementRef}) card!: ElementRef;
  @Input() skill!: Summary;

  public isVisible$?: Observable<boolean>;
  private OnDestroy$: Subject<void> = new Subject<void>();
  constructor(private animation: AnimationService) {
    
  }

  ngAfterViewInit(): void {
    this.isVisible$ = this.animation.observeElement(this.card.nativeElement, 500)
    .pipe(
      takeUntil(this.OnDestroy$),
      map((value) => this.animation.isIntersecting(value.entry))
    );
    this.isVisible$.subscribe((visible) => console.log(`${this.skill.title} visible: ${visible}`))
  }

  ngOnDestroy(): void {
      
  }

}
