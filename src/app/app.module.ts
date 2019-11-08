import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import {HttpClientModule} from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular4-social-login';
import { HomeComponent } from './home/home.component';

import {StorageServiceModule} from 'angular-webstorage-service';


const google_oauth_client_id:string = '206662548839-srktnk0qakt9j1csut960egel7fmsmo2.apps.googleusercontent.com';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(google_oauth_client_id)
  }
]);
const appRoute: Routes = [
  {path: 'newUser', component: UserFormComponent},
  {path: 'loading', component: LoadingComponent},
  {path: 'userDetails', component: UserDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserDetailsComponent,
    LoadingComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StorageServiceModule,
    
    RouterModule.forRoot(appRoute),
    SocialLoginModule.initialize(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }