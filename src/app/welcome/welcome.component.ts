import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovieDataSource } from '../services/MovieDataSource';
import { MovieService } from '../services/movie.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fromEvent } from 'rxjs/observable/fromEvent';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay
} from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(private movieService: MovieService) {}

  displayedColumns = ['imdbID', 'Title', 'Year', 'Type', 'Poster'];
  dataSource = new MovieDataSource(this.movieService);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('input')
  input: ElementRef;
  // Pagination
  length: number;
  ngOnInit() {
    this.dataSource.loadMovies('', 'asc', 1);
    // this.length = this.dataSource.getTotalRows();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 1));

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 1;

          this.loadMoviesPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadMoviesPage()))
      .subscribe();
  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
  loadMoviesPage() {
    this.dataSource.loadMovies(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex
    );
  }
}
