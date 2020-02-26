import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavegationComponent } from './components/navegation/navegation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminModule } from './components/admin/admin.module';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { ModalComponent } from './components/modals/modal/modal.component';
import { DetailsComponent } from './components/details/details.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PipeAgoModule } from './pipe.module';
import { MomentModule } from 'ngx-moment';
import { DetailpostComponent } from './components/modals/detailpost/detailpost.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FotterComponent } from './components/fotter/fotter.component';
import { environment } from "../environments/environment";
import { ContactComponent } from './components/contact/contact.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

const config: SocketIoConfig = { url: environment.URL, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavegationComponent,
    ErrorpageComponent,
    ModalComponent,
    DetailsComponent,
    DetailpostComponent,
    FotterComponent,
    ContactComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    AppRoutingModule,
    PipeAgoModule,
    MomentModule,
    NgbModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
    DetailpostComponent
  ]
})
export class AppModule { }
