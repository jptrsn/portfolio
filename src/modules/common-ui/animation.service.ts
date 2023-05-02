import { animate, state, style, transition, trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, lastValueFrom, map, shareReplay, startWith, switchMap, tap } from 'rxjs';

const duration: number = 500;

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor() { 
  }

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

  public observeElements(elements: HTMLElement[], debounce = 0, config: IntersectionObserverInit = {}): Observable<{ entry: IntersectionObserverEntry, observer: IntersectionObserver}> {
    const sub$: Subject<any> = new Subject<any>();
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        sub$.next({ entry, observer});
      })
    }, config);
    elements.forEach((el) => observer.observe(el));
    return sub$.asObservable().pipe(debounceTime(debounce));
  }

  public observeScrollIntersection(el: HTMLElement, parent?: HTMLElement, stepSize: number = 0.1): Observable<number> {
    const threshold: number[] = [];
    for (let i = 0; i <= 1; i += stepSize) {
      threshold.push(i);
    }
    const config: IntersectionObserverInit = {root: parent, threshold}
    const intersect$: Subject<number> = new Subject<number>();
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        intersect$.next(entry.intersectionRatio);
      });
    }, config)
    observer.observe(el);
    return intersect$.asObservable();
  }

  public isIntersecting(entry: IntersectionObserverEntry): boolean {
    return entry.isIntersecting || entry.intersectionRatio > 0;
  }
}
