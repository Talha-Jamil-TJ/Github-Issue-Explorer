import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  isMobile!: Signal<boolean>;

  constructor(private _breakpointObserver: BreakpointObserver) {
    this._setIsMobile();
  }

  private _setIsMobile() {
    this.isMobile = toSignal(
      this._breakpointObserver.observe('(max-width: 600px)').pipe(map((result) => result.matches)),
      { initialValue: false },
    );
  }
}
