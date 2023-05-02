import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TitleService } from 'src/modules/common-ui/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title$?: Observable<string>;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.title$ = this.titleService.title$.pipe(takeUntil(this.onDestroy$));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
