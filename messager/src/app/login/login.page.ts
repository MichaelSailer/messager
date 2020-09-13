import { LoggerService } from './../services/logger.service';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    username: '',
    password: ''
  };

  constructor(private loggerService: LoggerService, private nav: NavController, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  loginUser(){
    console.log(this.user);
    this.loggerService.checkLogin(this.user.username,this.user.password);
  }
}
