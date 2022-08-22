import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';

import { RegisterModalComponent } from './components/modals/register-modal/register-modal.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { CatalogPageComponent } from './components/pages/catalog-page/catalog-page.component';
import { FilmPageComponent } from './components/pages/film-page/film-page.component';
import { FilmsListComponent } from './components/pages/films-list/films-list.component';
import { FilmCardComponent } from './components/pages/film-card/film-card.component';
import { ActorsCardComponent } from './components/pages/actors-card/actors-card.component';
import { VideoPlayerComponent } from './components/pages/video-player/video-player.component';
import { ButtonsPageComponent } from './components/pages/buttons-page/buttons-page.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { UserAboutComponent } from './components/pages/user-about/user-about.component';
import { UserModalComponent } from './components/modals/user-modal/user-modal.component';
import { MovieRatingComponent } from './components/pages/movie-rating/movie-rating.component';
import { MenuButtonComponent } from './components/pages/menu-button/menu-button.component';
import { CatalogFilterComponent } from './components/pages/catalog-filter/catalog-filter.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterModalComponent,
    LoginModalComponent,
    StartPageComponent,
    CatalogPageComponent,
    FilmPageComponent,
    FilmsListComponent,
    FilmCardComponent,
    ActorsCardComponent,
    VideoPlayerComponent,
    ButtonsPageComponent,
    UserPageComponent,
    UserAboutComponent,
    UserModalComponent,
    MovieRatingComponent,
    MenuButtonComponent,
    CatalogFilterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatMenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
