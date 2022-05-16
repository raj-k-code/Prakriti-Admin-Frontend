import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './component/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './component/home/home.component';
// import { GoogleLoginProvider } from 'angularx-social-login';

// const socialProvider = {
//   provide: 'SocialAuthServiceConfig',
//   useValue: {
//     providers: [
//       {
//         id: GoogleLoginProvider.PROVIDER_ID,
//         provider: new GoogleLoginProvider("253301020124-egmb4dq6rkg25sp64r0pn48os7fvgd8k.apps.googleusercontent.com"),
//       }
//     ]
//   }
// };

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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
