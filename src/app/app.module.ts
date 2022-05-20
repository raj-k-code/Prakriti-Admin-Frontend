import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './component/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './component/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenIntercepterService } from './intercepter/token-intercepter.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { NgxSpinnerModule } from 'ngx-spinner'

const socialProvider = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("1001369966895-6h7jafhdsqlk1u6asklf0jbulj8c4h8q.apps.googleusercontent.com"),
      }
    ]
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    SocialLoginModule,
    NgxSpinnerModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true
    },
    socialProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
