import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '../../node_modules/@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './http.service'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlphaComponent } from './alpha/alpha.component';
import { BetaComponent } from './beta/beta.component';
import { LambdaComponent } from './lambda/lambda.component';
import { TetaComponent } from './teta/teta.component';
import { DeltaComponent } from './delta/delta.component';
import { GammaComponent } from './gamma/gamma.component';
import { ResearchComponent } from './research/research.component';
import { EpsilonComponent } from './epsilon/epsilon.component';
import { RhoComponent } from './rho/rho.component';
import { NanoComponent } from './nano/nano.component';
import { StorageServiceModule } from 'angular-webstorage-service';



@NgModule({
  declarations: [
    AppComponent,
    AlphaComponent,
    BetaComponent,
    LambdaComponent,
    TetaComponent,
    DeltaComponent,
    GammaComponent,
    ResearchComponent,
    EpsilonComponent,
    RhoComponent,
    NanoComponent,
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    HttpClientModule,
    FormsModule,  //register FormsModule with our app.
    AppRoutingModule // we need that for routings
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
