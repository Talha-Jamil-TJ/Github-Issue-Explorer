import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, input, OnInit, Signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Repository, RepositoryTopic } from '../../interface/generated.interface';
import { ShortNumberPipe } from '../../pipe/short-number.pipe';

@Component({
  selector: 'app-repository-item',
  standalone: true,
  imports: [CommonModule, MatIcon, ShortNumberPipe, RouterLink, NgOptimizedImage],
  templateUrl: './repository-item.component.html',
  styleUrl: './repository-item.component.scss',
})
export class RepositoryItemComponent implements OnInit {
  repository = input.required<Repository>();
  isLocalNavigation = input.required<boolean>();

  descriptionHTML!: Signal<SafeHtml>;
  topicNodes!: Signal<RepositoryTopic[]>;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.descriptionHTML = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.repository().descriptionHTML));
    this.topicNodes = computed(() => (this.repository().repositoryTopics.nodes ?? []) as RepositoryTopic[]);
  }
}
