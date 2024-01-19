import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Repository, RepositoryTopic } from '@shared/interface/generated.interface';
import { ShortNumberPipe } from '@shared/pipe/short-number.pipe';

@Component({
  selector: 'app-repository-item',
  standalone: true,
  imports: [CommonModule, MatIcon, ShortNumberPipe],
  templateUrl: './repository-item.component.html',
  styleUrl: './repository-item.component.scss',
})
export class RepositoryItemComponent {
  repository = input.required<Repository>();

  topicNodes: RepositoryTopic[] = [];

  constructor() {
    effect(() => {
      this.topicNodes = (this.repository().repositoryTopics.nodes ?? []) as RepositoryTopic[];
    });
  }
}
