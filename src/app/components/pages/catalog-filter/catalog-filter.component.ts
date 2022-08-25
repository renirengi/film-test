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
    genres: new FormControl(['']),
    types: new FormControl(['']),
    directors: new FormControl(['']),
    countries: new FormControl(['']),
    languages: new FormControl(['']),
    rated: new FormControl(['']),
    year: new FormControl(['']),
    priceMax: new FormControl(['']),
    priceMin: new FormControl(['']),
    onlySale: new FormControl(false),
    price: new FormControl(['']),
    q: new FormControl('')
  });

  public genres$: Observable<string[]>;

  public types$: Observable<string[]>;

  public directors$: Observable<string[]>;

  public countries$: Observable<string[]>;

  public languages$: Observable<string[]>;

  public rateds$: Observable<string[]>;

  public years$: Observable<string[]>;

  public prices$: Observable<string[]>;

  public prices!:string[];

  public currentGenre: string | null ='';

  selected: string =''

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
    this.years$ = this.filmService.getAvailable('years');
    this.prices$ = this.filmService.getAvailable('prices');
    this.filmService.getAvailable('prices').subscribe({next:(data: string[]) => this.prices=data});

  }

   public ngOnInit() {
    const searchString$ = this.route.queryParams.pipe(map(params => params['q'])).pipe(
      tap((q) => {
        this.filtersForm.patchValue({q});
        this.filmService.filmSearchString = q || '';
        this.onChange();
      })

    );

    this.currentGenre = this.filmService._currentGenre$.getValue();
    if (this.currentGenre) {
      let newArr=[]
      newArr.push(this.currentGenre)
      this.filtersForm.get('genres')!.setValue(newArr);
      this.onChange();
    }

    this.subscription.add(searchString$.subscribe());
    }


  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

public onChange() {
  let filterParams: {} = {};
  console.log(this.filtersForm.value['genres']);

  filterParams = Object.entries(this.filtersForm.value).reduce((acc, [key, value]) => {
    let keyString: string;
    let valueString: string;

    if (typeof value === 'string') {
      /*if( key=='priceMin' || key=='priceMax'){
        let priceMin=5.6;
        let priceMax= 120.98;
        if(key=='priceMin'){
          priceMin=+value;
        }
        else{
          priceMax=+value;
        }
        this.getInterval(priceMin, priceMax);
      }*/
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

private getInterval(min:any, max:any){
return this.prices.filter((el) => el >= min && el<= max).map((el)=>String(el))
}

private booleanFilterGenerator(key: string): string[] {
  const config: {[key: string]: () => string[]} = {
    notReissue: () => ['reissue', 'false'],
  };

  return config[key]();
}


}
