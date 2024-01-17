import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TokenQueryMock } from '@mock/token.query.mock';
import { FormError } from '@shared/enum/error.enum';
import { TokenQuery } from '@store/token/token.query';
import { TokenService } from '@store/token/token.service';
import { Subject } from 'rxjs';
import { TokenFormTestId } from './token-form-test-id.enum';
import { TokenFormComponent } from './token-form.component';
import spyOn = jest.spyOn;

describe('TokenFormComponent', () => {
  let component: TokenFormComponent;
  let fixture: ComponentFixture<TokenFormComponent>;

  let tokenService: TokenService;

  const getElement = <T extends HTMLElement>(testId: TokenFormTestId): T => {
    return fixture.debugElement.query(By.css(`[data-test-id="${testId}"]`))?.nativeElement;
  };

  const userEmitter = new Subject<void>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: TokenQuery,
          useClass: TokenQueryMock,
        },
        {
          provide: TokenService,
          useValue: {
            getUser: () => userEmitter,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenFormComponent);
    component = fixture.componentInstance;
    tokenService = TestBed.inject(TokenService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct heading text', () => {
    const element = getElement<HTMLHeadingElement>(TokenFormTestId.Heading);

    expect(element.textContent?.trim()).toEqual('GitHub Issue Explorer');
  });

  it('should render correct second heading text', () => {
    const element = getElement<HTMLParagraphElement>(TokenFormTestId.Heading2);

    expect(element.textContent?.trim()).toEqual(
      'Enter your API token to start browsing issues of public repositories.',
    );
  });

  it('should render correct second sub-heading text when isMobile() returns false', () => {
    component.isMobile = signal(false);

    fixture.detectChanges();

    const element = getElement(TokenFormTestId.Subheading);

    expect(element.textContent?.trim()).toEqual('For assistance with generating your API token, please click here');
  });

  it('should render correct second sub-heading text when isMobile() returns true', () => {
    component.isMobile = signal(true);

    fixture.detectChanges();

    const element = getElement(TokenFormTestId.Subheading);

    expect(element.textContent?.trim()).toEqual('For assistance with generating your API token, please touch here');
  });

  it('should render correct hint text', () => {
    const element = getElement<HTMLParagraphElement>(TokenFormTestId.Hint);

    expect(element.textContent?.trim()).toEqual(
      'The token is only stored on your machine as long as you are on this app.',
    );
  });

  it('should render input element', () => {
    const element = getElement(TokenFormTestId.Input);

    expect(element).toBeTruthy();
  });

  it('should render submit button with correct text', () => {
    const element = getElement<HTMLButtonElement>(TokenFormTestId.SubmitButton);

    expect(element.textContent?.trim()).toEqual('Start Browsing');
  });

  it('should call onSubmit() when submit button is clicked', () => {
    const spy = spyOn(component, 'onSubmit');

    const element = getElement<HTMLButtonElement>(TokenFormTestId.SubmitButton);

    element.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should disable submit button when isLoading is true', () => {
    component.isLoading = signal(true);

    fixture.detectChanges();

    const element = getElement<HTMLButtonElement>(TokenFormTestId.SubmitButton);

    expect(element.disabled).toEqual(true);
  });

  it('should not disable submit button when isLoading is false', () => {
    component.isLoading = signal(false);

    fixture.detectChanges();

    const element = getElement<HTMLButtonElement>(TokenFormTestId.SubmitButton);

    expect(element.disabled).toEqual(false);
  });

  it('should render required error when form is submitted and no value is entered', async () => {
    component.tokenControl.setErrors({ [FormError.Required]: true });
    component.tokenControl.markAsTouched();

    fixture.detectChanges();

    const element = getElement(TokenFormTestId.InputRequiredError);

    expect(element.textContent?.trim()).toEqual('API Token is required');
  });

  it('should render required error when form is submitted and no value is entered', async () => {
    component.tokenControl.setErrors({ [FormError.InvalidToken]: true });
    component.tokenControl.markAsTouched();

    fixture.detectChanges();

    const element = getElement(TokenFormTestId.InputInvalidTokenError);

    expect(element.textContent?.trim()).toEqual('API Token is invalid. Please use the above link for help');
  });

  it('should call _setTokenControl() when ngOnInit() is called', async () => {
    const spy = spyOn(component as never, '_setTokenControl');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should set tokenControl when _setTokenControl() is called', async () => {
    component.tokenControl = null as never;

    component['_setTokenControl']();

    expect(component.tokenControl).toBeTruthy();
  });

  it('should call getUser() in tokenService when onSubmit() is called and tokenControl is valid', async () => {
    const spy = spyOn(tokenService, 'getUser');

    component.tokenControl = new FormControl('my token');

    component.onSubmit();

    expect(spy).toHaveBeenCalled();
  });

  it('should not call getUser() in tokenService when onSubmit() is called and tokenControl is invalid', async () => {
    const spy = spyOn(tokenService, 'getUser');

    component.tokenControl.setErrors({ someRandomError: true });

    component.onSubmit();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should set error in tokenControl when onSubmit() is called and getUser() subject throws an error', async () => {
    component.tokenControl = new FormControl('my token');

    component.onSubmit();

    userEmitter.error('Some Error');

    expect(component.tokenControl.errors).toEqual({ [FormError.InvalidToken]: true });
  });

  afterAll(() => {
    userEmitter.complete();
  });
});
