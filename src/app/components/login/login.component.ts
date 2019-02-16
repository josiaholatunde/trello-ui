import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForLogin: any = {};
  @Output() hideLoginAndRegisterChange = new EventEmitter();
  constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.userService.loginUser(this.userForLogin).subscribe(res => {
      this.alertify.success('Login was successful');
      this.hideLoginAndRegisterChange.emit(false);
    }, err => this.alertify.error(err),
    () => {
      this.router.navigate(['bookings/Hotel']);
    });
  }

}
