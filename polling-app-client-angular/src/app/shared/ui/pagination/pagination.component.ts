import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Pagination } from '../../data-access/models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input() pagination!: Pagination;
  @Output() selectedPagination: EventEmitter<{ page: number; size: number }> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  paginationChangeEmit(page: number, size: number) {
    this.selectedPagination.emit({ page, size });
  }
}
