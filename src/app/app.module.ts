import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlexibleShowcaseModule } from './flexible-showcase/flexible-showcase-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    FlexibleShowcaseModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
