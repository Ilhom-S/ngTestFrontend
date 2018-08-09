import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HttpModule, JsonpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WelcomeComponent } from './welcome/welcome.component';
import { MovieService } from './services/movie.service';
import { AppRouters } from './app.routes';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, MovieDetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRouters,
    HttpModule,
    JsonpModule,
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
