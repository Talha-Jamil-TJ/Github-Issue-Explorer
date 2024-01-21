import { input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ISSUES_MOCK } from '@mock/issues.const.mock';
import { IssueItemComponent } from './issue-item.component';

describe('IssueItemComponent', () => {
  let component: IssueItemComponent;
  let fixture: ComponentFixture<IssueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueItemComponent);
    component = fixture.componentInstance;

    component.issue = input(ISSUES_MOCK[0]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
