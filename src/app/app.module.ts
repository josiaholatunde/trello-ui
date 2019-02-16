import { AppRouterModule } from './app-router/app-router.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { OverviewComponent } from './components/overview/overview.component';
import { DetailComponent } from './components/detail/detail.component';
import { CtaComponent } from './components/cta/cta.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BookingSubjectService } from './services/booking-subject.service';
import { BookingSubjectResolver } from './resolvers/booking-subject.resolver';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import {CarouselModule} from 'primeng/carousel';
import { LoginRegisterPageComponent } from './components/login-register-page/login-register-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertifyService } from './services/alertify.service';
import { UserService } from './services/user.service';
import { ErrorInterceptor } from './services/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GalleryComponent,
    OverviewComponent,
    DetailComponent,
    CtaComponent,
    HeaderComponent,
    HomeComponent,
    TestComponent,
    LoginRegisterPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRouterModule,
    CarouselModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    ButtonModule
  ],
  providers: [
    BookingSubjectService,
    BookingSubjectResolver,
    AlertifyService,
    UserService,
    ErrorInterceptor
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
