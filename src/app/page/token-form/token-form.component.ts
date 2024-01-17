import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Error } from '@shared/enum/error.enum';
import { BreakpointService } from '@shared/service/breakpoint.service';
import { TokenQuery } from '@store/token/token.query';
import { TokenService } from '@store/token/token.service';

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

  isLoading = this._tokenQuery.isLoading;

  Error = Error;

  constructor(
    private _breakpointService: BreakpointService,
    private _tokenService: TokenService,
    private _tokenQuery: TokenQuery,
  ) {}

  ngOnInit(): void {
    this._setTokenControl();
  }

  onSubmit() {
    if (this.tokenControl.invalid) {
      return;
    }

    this._tokenService.getUser(this.tokenControl.value ?? '').subscribe({
      next: () => {},
      error: () => {
        this.tokenControl.setErrors({ ...this.tokenControl.errors, [this.Error.InvalidToken]: true });
      },
    });
  }

  private _setTokenControl() {
    this.tokenControl = new FormControl<string | null>(null, [Validators.required]);
  }
}
