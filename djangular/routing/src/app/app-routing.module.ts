import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlphaComponent } from './alpha/alpha.component';
import { BetaComponent } from './beta/beta.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: 'show/:id', component: BetaComponent},
  {path: '', pathMatch: 'full', component: AlphaComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
