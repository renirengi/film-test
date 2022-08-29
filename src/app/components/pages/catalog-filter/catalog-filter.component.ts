import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin, map, Observable, Subscription, tap } from 'rxjs';
import { FilmService } from 'src/app/services/film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
})
export class CatalogFilterComponent implements OnInit, OnDestroy {
  @Output() filtersChanged = new EventEmitter<{ [key: string]: string }>();

  private subscription: Subscription = new Subscription();
  public filtersForm = new FormGroup({
    genres: new FormControl(['']),
    types: new FormControl([]),
    directors: new FormControl([]),
    countries: new FormControl([]),
    languages: new FormControl([]),
    rated: new FormControl([]),
    year: new FormControl([]),
    priceMax: new FormControl(),
    priceMin: new FormControl(),
    maxRating: new FormControl(),
    minRating: new FormControl(),
    onlySale: new FormControl(false),
    price: new FormControl([]),
    q: new FormControl(''),
  });
  public filtersOptions$: Observable<{[key: string]: string[]}>

  public prices: string[] = [];
  public ratingArr: string[] = [];
  public currentGenre: string | null = '';
  public searchString: string = '';

   constructor(private filmService: FilmService, private route: ActivatedRoute) {
    this.filtersOptions$ = forkJoin({
      genres: this.filmService.getAvailable('genre'),
      types: this.filmService.getAvailable('type'),
      directors: this.filmService.getAvailable('director'),
      countries: this.filmService.getAvailable('country'),
      languages: this.filmService.getAvailable('language'),
      rateds: this.filmService.getAvailable('rated'),
      years: this.filmService.getAvailable('years'),
      prices: this.filmService.getAvailable('prices'),
    });


  }

  public ngOnInit() {
    this. getPricesOrRating("prices").then((prices) => (this.prices = prices));
    this. getPricesOrRating("rating").then((rating) => (this.ratingArr= rating));

    this.currentGenre = this.filmService._currentGenre$.getValue();
    if (this.currentGenre) {
      let newArr = [];
      newArr.push(this.currentGenre);
      this.filtersForm.get('genres')!.patchValue(newArr);
      this.onChange();
    }

    const searchString$ = this.route.queryParams
      .pipe(map((params) => params['q']))
      .pipe(
        tap((q) => {
          this.filtersForm.patchValue({ q });
          this.filmService.filmSearchString = q || '';
          this.searchString = q;
          this.onChange();
        })
      );

    this.subscription.add(searchString$.subscribe());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getPricesOrRating(str:string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let arr: string[] = [];
      this.filmService.getAvailable(str).subscribe((data) => {
        data.forEach((price) => {
          arr.push(price);
        });
        resolve(arr);
      });
    });
  }

  public onChange() {
    let filterParams: { [key: string]: string } = {};

    filterParams = Object.entries(this.filtersForm.value).reduce(
      (acc, [key, value]) => {
        let keyString: string;
        let valueString: string;

        if (key == 'priceMin' || key == 'priceMax') {

          let price = [''];
          let minValue;
          let maxValue;
          if (
            this.filtersForm.value['priceMax'] &&
            this.filtersForm.value['priceMin']
          ) {
            minValue = +this.filtersForm.value['priceMin'];
            maxValue = +this.filtersForm.value['priceMax'];
            price = this.getInterval(minValue, maxValue, this.prices);

            keyString = `price_like`;
            valueString = price.reduce(
              (acc, val, i) => (i === 0 ? `(${val})` : `${acc}|(${val})`),
              ''
            );

            acc = { ...acc, [keyString]: valueString };
          }
        }
        else if(key=='minRating'|| key == 'maxRating') {
          let ratingCur = [''];
          let minValue:number;
          let maxValue:number;
          if (
            this.filtersForm.value['minRating'] &&
            this.filtersForm.value['maxRating']
          ){

            minValue = +this.filtersForm.value['minRating'];
            maxValue = +this.filtersForm.value['maxRating'];
            ratingCur = this.getInterval(minValue, maxValue, this.ratingArr);

            keyString = `rating_like`;
            valueString = ratingCur.reduce(
              (acc, val, i) => (i === 0 ? `(${val})` : `${acc}|(${val})`),
              ''
            );
            acc = { ...acc, [keyString]: valueString };
          }
        }
         else if (Array.isArray(value) && value.length > 0) {
          keyString = `${key}_like`;
          valueString = value.reduce(
            (acc, val, i) => (i === 0 ? `(${val})` : `${acc}|(${val})`),
            ''
          );
           if(valueString !=="()"){
            acc = { ...acc, [keyString]: valueString };
}
        } else if (typeof value === 'boolean' && value === true) {
          [keyString, valueString] = this.booleanFilterGenerator(key);
          acc = { ...acc, [keyString]: valueString };
        }
        return acc;
      },
      {}
    );
    if (this.searchString) {
      filterParams['q'] = this.searchString;
    }
    console.log (filterParams)
    this.filtersChanged.emit(filterParams);

  }

  private getInterval(min: any, max: any, arr:string[] ) {
    return arr
      .filter((el) => el >= min && el <= max)
      .map((el) => String(el));
  }

  private booleanFilterGenerator(key: string): string[] {
    const config: { [key: string]: () => string[] } = {
      onlySale: () => ['onlySale', 'false'],
    };

    return config[key]();
  }
}
