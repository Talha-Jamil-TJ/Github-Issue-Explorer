import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, input, OnInit, Signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Issue } from '@shared/interface/generated.interface';

@Component({
  selector: 'app-issue-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './issue-item.component.html',
  styleUrl: './issue-item.component.scss',
})
export class IssueItemComponent implements OnInit {
  issue = input.required<Issue>();

  titleHTML!: Signal<SafeHtml>;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.titleHTML = computed(() => this._sanitizer.bypassSecurityTrustHtml(this.issue().titleHTML));
  }
}
