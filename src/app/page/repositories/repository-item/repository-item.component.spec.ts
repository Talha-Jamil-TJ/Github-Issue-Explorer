import { input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { REPOSITORIES_MOCK } from '@mock/repositories.const.mock';
import { RepositoryItemComponent } from './repository-item.component';

describe('RepositoryListItemComponent', () => {
  let component: RepositoryItemComponent;
  let fixture: ComponentFixture<RepositoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryItemComponent);
    component = fixture.componentInstance;

    component.repository = input(REPOSITORIES_MOCK[0]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
