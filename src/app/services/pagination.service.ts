import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, combineLatest, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService<T> {
  private itemsSource = new BehaviorSubject<T[]>([]);
  private currentPageSource = new BehaviorSubject<number>(1);
  private itemsPerPage = 10;

  items$ = this.itemsSource.asObservable();
  currentPage$ = this.currentPageSource.asObservable();
  totalPages$: Observable<number>;
  hasNextPage$: Observable<boolean>;
  hasPrevPage$: Observable<boolean>;

  constructor() {
    this.totalPages$ = this.items$.pipe(map((items) => Math.ceil(items.length / this.itemsPerPage)));
    this.hasPrevPage$ = this.currentPage$.pipe(map((currentPage) => currentPage > 1));
    this.hasNextPage$ = combineLatest([this.currentPage$, this.totalPages$]).pipe(
      map(([currentPage, totalPages]) => currentPage < totalPages)
    );

    combineLatest([this.currentPage$, this.totalPages$])
      .pipe(
        map(([currentPage, totalPages]) => {
          if (currentPage < 1) return 1;
          if (currentPage > totalPages) return Math.max(totalPages, 1);
          return currentPage;
        })
      )
      .subscribe(this.currentPageSource);
  }

  init(items: T[], itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.itemsSource.next(items);
    const totalPages = Math.ceil(items.length / this.itemsPerPage);
    const newPage = this.calculateNewPage(this.currentPageSource.getValue(), totalPages);
    this.currentPageSource.next(newPage);
    this.hasNextPage$ = this.currentPage$.pipe(map((currentPage) => currentPage < totalPages));
    this.hasPrevPage$ = this.currentPage$.pipe(map((currentPage) => currentPage > 1));
  }

  private calculateNewPage(currentPage: number, totalPages: number): number {
    if (currentPage < 1) return 1;
    if (currentPage > totalPages) return Math.max(totalPages, 1);
    return currentPage;
  }

  getPaginatedItems(): Observable<T[]> {
    return combineLatest([this.items$, this.currentPage$]).pipe(
      map(([items, currentPage]) => {
        const startIndex = (currentPage - 1) * this.itemsPerPage;
        return items.slice(startIndex, startIndex + this.itemsPerPage);
      })
    );
  }

  nextPage(): void {
    this.totalPages$.pipe(take(1)).subscribe((totalPages) => {
      const newPage = Math.min(this.currentPageSource.value + 1, totalPages);
      this.currentPageSource.next(newPage);
      this.hasNextPage$ = this.currentPage$.pipe(map((currentPage) => currentPage < totalPages));
    });
  }

  prevPage(): void {
    this.currentPageSource.next(Math.max(this.currentPageSource.value - 1, 1));
    this.hasPrevPage$ = this.currentPage$.pipe(map((currentPage) => currentPage > 1));
  }
}
