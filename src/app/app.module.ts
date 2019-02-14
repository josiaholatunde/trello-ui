import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { OverviewComponent } from './components/overview/overview.component';
import { DetailComponent } from './components/detail/detail.component';
import { CtaComponent } from './components/cta/cta.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BookingSubjectService } from './services/booking-subject.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GalleryComponent,
    OverviewComponent,
    DetailComponent,
    CtaComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ BookingSubjectService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
