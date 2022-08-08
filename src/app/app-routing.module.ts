import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPageComponent } from './components/pages/catalog-page/catalog-page.component';
import { FilmPageComponent } from './components/pages/film-page/film-page.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent},
  //{ path: 'user', component: UserPageComponent },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'catalog/:id', component: FilmPageComponent },
  //{ path: 'users', component: AllUsersPageComponent },
  //{ path: 'users/:id', component:WatchUserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
