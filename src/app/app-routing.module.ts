import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavegationComponent } from './components/navegation/navegation.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { AuthLoginIgnoreGuard } from './shared/guards/auth-login-ignore.guard';
import { DetailsComponent } from './components/details/details.component';
import { ContactComponent } from './components/contact/contact.component';
import { PostResolverGuard } from './shared/resolvers/post-resolver.guard';
import { DetailResolverGuard } from './shared/resolvers/detail-resolver.guard';
const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home/Tech'
  },
  {
    path: 'home/:cattmpd', component: HomeComponent, resolve: { PostResolverGuard }
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AuthLoginIgnoreGuard]
  },
  {
    path: 'detail/:id', component: DetailsComponent, resolve: { DetailResolverGuard }
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: '**', component: ErrorpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
