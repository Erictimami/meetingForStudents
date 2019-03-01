import { AlphaComponent } from './alpha/alpha.component';
import { BetaComponent } from './beta/beta.component';
import { LambdaComponent } from './lambda/lambda.component';
import { TetaComponent } from './teta/teta.component';
import { DeltaComponent } from './delta/delta.component';
import { GammaComponent } from './gamma/gamma.component';
import { EpsilonComponent } from './epsilon/epsilon.component';
import { RhoComponent } from './rho/rho.component';
import { NanoComponent } from './nano/nano.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'register', component: AlphaComponent},//the page of registration
  {path: 'home', component: BetaComponent},  // Home page. all the sessions of the side
  {path: 'login', component: GammaComponent},//Page of login
  {path: 'session', component: LambdaComponent}, // creation of the session.
  {path: 'mySessions', component: TetaComponent}, // my sessions 
  {path: 'updateSession/:id', component: EpsilonComponent}, // for updating session
  {path: 'chatroom/:id', component: RhoComponent}, //chatroom of the session
  {path: 'requestsForSession', component: NanoComponent}, //manage requests for joining session
  // redirect to /gamma if there is nothing in the url(means at the /, redirect to /gamma)
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  // the ** will catch anything that did not match any of the above routes
  {path: '**', component: DeltaComponent} //the final route if not match with all the route predefine
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
