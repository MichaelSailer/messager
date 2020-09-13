import { Component, OnInit } from '@angular/core';
import { LoggerService, User } from '../services/logger.service';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private musterUser: User = {
    userid: this.makeid(10),
    email: 'mustermann@gmail.com',
    firstName: 'Max',
    lastName: 'Mustermann',
    password: '1234'
  };

  constructor(private loggerService: LoggerService, private nav: NavController, private loadingController: LoadingController) { }

  ngOnInit() {}

  async saveUser(){
    const loading = await this.loadingController.create({
      message: 'Saving...',
      spinner: 'dots'
    });

    loading.present();

    this.loggerService.addUser(this.musterUser).then(() => {
      loading.dismiss();
    });
  }

  makeid(length): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
}
