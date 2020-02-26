import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/auth/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { EmmiterService } from 'src/app/services/emmiter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: true;
  user: User
  isLoading: boolean = false;
  constructor(private emmiter: EmmiterService, private userService: UserService, private tokenService: TokenService, private router: Router) {
    this.user = { username: '', password: '' }
  }

  ngOnInit() {
    this.emmiter.state.emit(false);
  }

  isUsername: boolean;

  getErrorMessage() {
    if (!this.isUsername) {
      return 'Usuario incorrecto!'
    }
  }

  login() {
    this.isLoading = true;
    this.userService.signIn(this.user).subscribe((res) => {
      this.user = res;
      this.tokenService.saveToken(this.user.token);
      this.isLoading = false;
      this.router.navigate(['/admin']);

    }, (error) => {
      //console.log(error);
      this.isLoading = false;
      this.isUsername = false;
    })
  }

}
