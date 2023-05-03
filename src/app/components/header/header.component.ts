import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AnimationService } from 'src/modules/common-ui/animation.service';
import { TitleService } from 'src/modules/common-ui/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [AnimationService.fadeInOut, AnimationService.flyInOutRight],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title$?: Observable<string>;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private titleService: TitleService,
              private animation: AnimationService) {}

  ngOnInit(): void {
    this.title$ = this.titleService.title$.pipe(takeUntil(this.onDestroy$));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  scrollToComponent(name: string): void {
    this.animation.animateToComponent(name);
  }
}
