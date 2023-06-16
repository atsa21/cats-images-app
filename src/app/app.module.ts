import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CatsCardComponent } from './components/main/cats-card/cats-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/main/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';
import { FiltersComponent } from './components/main/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatsCardComponent,
    HeaderComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
