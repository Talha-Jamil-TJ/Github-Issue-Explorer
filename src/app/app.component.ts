import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '@shared/component/header/header.component';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, MatCardModule, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  showNavbar = signal(false);

  private destroy$ = new Subject<void>();

  constructor(private _route: Router) {}

  ngOnInit() {
    this._subscribeToRouteChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  _subscribeToRouteChanges() {
    this._route.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((events) => {
        if (events instanceof NavigationEnd) {
          this.showNavbar.set(events.url !== '/');
          console.log('router events: ', events);
        }
      });
  }
}
