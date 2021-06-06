import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationInfo } from '../../models/pagination-info';

@Component({
  selector: 'app-pagination-buttons-widget',
  templateUrl: './pagination-buttons-widget.component.html',
  styles: [],
})
export class PaginationButtonsWidgetComponent implements OnInit {
  @Input() pagination: PaginationInfo;
  @Output() selectedPagination: EventEmitter<{ page: number; size: number }> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  paginationChangeEmit(page: number, size: number) {
    this.selectedPagination.emit({ page: page, size: size });
  }
}
