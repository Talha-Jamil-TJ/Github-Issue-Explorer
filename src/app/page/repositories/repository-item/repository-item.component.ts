import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, Signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Repository, RepositoryTopic } from '@shared/interface/generated.interface';
import { ShortNumberPipe } from '@shared/pipe/short-number.pipe';

@Component({
  selector: 'app-repository-item',
  standalone: true,
  imports: [CommonModule, MatIcon, ShortNumberPipe],
  templateUrl: './repository-item.component.html',
  styleUrl: './repository-item.component.scss',
})
export class RepositoryItemComponent implements OnInit {
  repository = input.required<Repository>();

  descriptionHTML!: Signal<SafeHtml>;
  topicNodes!: Signal<RepositoryTopic[]>;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.descriptionHTML = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.repository().descriptionHTML));
    this.topicNodes = computed(() => (this.repository().repositoryTopics.nodes ?? []) as RepositoryTopic[]);
  }
}
