import { animate, state, style, transition, trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Observable, Subject, debounceTime } from 'rxjs';

const duration: number = 500;

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor() { }

  public static fadeInOut = trigger('fadeInOut', [
    state('show', style({
      opacity: 1
    })),
    state('hide', style({
      opacity: 0
    })),
    transition('show => hide', animate(`${duration}ms ease-out`)),
    transition('hide => show', animate(`${duration}ms ease-in`)),
  ]);

  public static flyInOutLeft = trigger('flyInOutLeft', [
    state('show', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    state('hide', style({
      opacity: 0,
      transform: 'translateX(-100%)'
    })),
    transition('show => hide', animate(`${duration}ms ease-out`)),
    transition('hide => show', animate(`${duration}ms ease-in`)),
  ])

  public static flyInOutRight = trigger('flyInOutRight', [
    state('show', style({
      opacity: 1,
      transform: 'translateX(0)',
    })),
    state('hide', style({
      opacity: 0,
      transform: 'translateX(100%)',
    })),
    transition('show => hide', animate(`${duration}ms ease-out`)),
    transition('hide => show', animate(`${duration}ms ease-in`)),
  ])

  public static growShrinkVertical = trigger('growShrinkVertical', [
    state('show', style({
      opacity: 1,
      transform: 'scale(1)'
    })),
    state('hide', style({
      opacity: 0,
      transform: 'scale(0)'
    })),
    transition('show => hide', animate(`${duration}ms ease-out`)),
    transition('hide => show', animate(`${duration}ms ease-in`)),
  ])

  public observeElement(el: HTMLElement, debounce = 0): Observable<{ entry: IntersectionObserverEntry, observer: IntersectionObserver}> {
    const sub$: Subject<any> = new Subject<any>();
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        sub$.next({ entry, observer});
      })
    });
    observer.observe(el);
    return sub$.asObservable().pipe(debounceTime(debounce));
  }

  public isIntersecting(entry: IntersectionObserverEntry): boolean {
    return entry.isIntersecting || entry.intersectionRatio > 0;
  }
}
