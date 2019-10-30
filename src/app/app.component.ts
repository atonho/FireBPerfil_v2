import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Contato',
      url: '/contato',
      icon: 'contacts'
    },
    {
      title: 'Lista de Contatos',
      url: '/lista',
      icon: 'List'
    },
    {
      title: 'Orçamentos',
      url: '/orcamento-cadastro',
      icon: 'contacts'
    },
    {
      title: 'Lista de Orçamentos',
      url: '/orcamento-lista',
      icon: 'contacts'
    },
    
    {
      title: 'Gastos',
      url: '/gasto-cadastro',
      icon: 'contacts'
    },
    {
      title: 'Lista de Gastos',
      url: '/gasto-lista',
      icon: 'contacts'
    },

    {
      title: 'Logoff',
      url: '/logoff',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
