import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, Subscription, tap } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss']
})
export class CatalogFilterComponent implements OnInit, OnDestroy {
  @Output() filtersChanged = new EventEmitter<{ [key: string]: string }>();

  private subscription: Subscription = new Subscription();

  public filtersForm = new FormGroup({
    genres: new FormControl([]),
    types: new FormControl([]),
    directors: new FormControl([]),
    countries: new FormControl([]),
    languages: new FormControl([]),
    rated: new FormControl([]),
    onlySale: new FormControl(false),
    q: new FormControl('')
  });

  public genres$: Observable<string[]>;

  public types$: Observable<string[]>;

  public directors$: Observable<string[]>;

  public countries$: Observable<string[]>;

  public languages$: Observable<string[]>;

  public rateds$: Observable<string[]>;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {
    this.genres$ = this.filmService.getAvailable('genre');
    this.types$ = this.filmService.getAvailable('type');
    this.directors$ = this.filmService.getAvailable('director');
    this.countries$ = this.filmService.getAvailable('country');
    this.languages$ = this.filmService.getAvailable('language');
    this.rateds$ = this.filmService.getAvailable('rated');

  }

   public ngOnInit() {
    const searchString$ = this.route.queryParams.pipe(map(params => params['q'])).pipe(
      tap((q) => {
        this.filtersForm.patchValue({q});
        this.filmService.filmSearchString = q || '';
        this.onChange();
      })

    );

    this.subscription.add(searchString$.subscribe());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

public onChange() {
  let filterParams: {} = {};

  filterParams = Object.entries(this.filtersForm.value).reduce((acc, [key, value]) => {
    let keyString: string;
    let valueString: string;

    if (typeof value === 'string') {
      keyString = key;
      valueString = value;
      acc = {...acc, [keyString]: valueString};
    } else if (Array.isArray(value) && value.length > 0) {
      keyString = `${key}_like`;
      valueString = value.reduce((acc, val, i) => i === 0 ? `(${val})`: `${acc}|(${val})`, '');
      acc = {...acc, [keyString]: valueString};
    } else if (typeof value === 'boolean' && value === true) {
      [keyString, valueString] = this.booleanFilterGenerator(key);
      acc = {...acc, [keyString]: valueString};
    }

    return acc;
  }, {});
  console.log(filterParams)

  this.filtersChanged.emit(filterParams);
}
private booleanFilterGenerator(key: string): string[] {
  const config: {[key: string]: () => string[]} = {
    notReissue: () => ['reissue', 'false'],
  };

  return config[key]();
}


}
