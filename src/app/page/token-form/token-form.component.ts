import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, Signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormError } from '@shared/enum/error.enum';
import { BreakpointService } from '@shared/service/breakpoint.service';
import { RepositoryQuery } from '@store/repository/repository.query';
import { TokenQuery } from '@store/token/token.query';
import { TokenService } from '@store/token/token.service';
import { TokenFormTestId } from './token-form-test-id.enum';

@Component({
  selector: 'app-token-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './token-form.component.html',
  styleUrl: './token-form.component.scss',
})
export class TokenFormComponent implements OnInit {
  tokenControl!: FormControl<string | null>;

  isMobile = this._breakpointService.isMobile;

  isLoading!: Signal<boolean>;

  TestId = TokenFormTestId;
  FormError = FormError;

  constructor(
    private _breakpointService: BreakpointService,
    private _repoQuery: RepositoryQuery,
    private _tokenService: TokenService,
    private _tokenQuery: TokenQuery,
    private _router: Router,
  ) {}

  ngOnInit() {
    this._setTokenControl();
    this._setIsLoading();
  }

  onSubmit() {
    if (this.tokenControl.invalid) {
      return;
    }

    this._tokenService.getUser(this.tokenControl.value ?? '').subscribe({
      next: () => {
        this._router.navigate(['repositories']);
      },
      error: () => {
        this.tokenControl.setErrors({ ...this.tokenControl.errors, [this.FormError.InvalidToken]: true });
      },
    });
  }

  private _setIsLoading() {
    this.isLoading = computed(() => this._tokenQuery.isLoading() || this._repoQuery.isLoading());
  }

  private _setTokenControl() {
    this.tokenControl = new FormControl<string | null>(null, [Validators.required]);
  }
}
