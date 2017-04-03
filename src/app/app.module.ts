import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AppRoutingModule }  from './app.routing';
import { AuthComponent} from './modules/auth/auth.component';
import { UserComponent } from './modules/user/user.component';
import { MerchantComponent } from './modules/merchant/merchant.component';

import { LoginService } from './modules/auth/login.service';
import { UserService } from './modules/user/user.service';
import { Ng2Webstorage } from 'ng2-webstorage';


@NgModule({
  imports:      [ 
  	BrowserModule ,
  	AppRoutingModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    Ng2Webstorage
  ],
  declarations: [
  	AppComponent,
  	AuthComponent,
  	UserComponent,
  	MerchantComponent
   ],
   providers: [
      LoginService,
      UserService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
