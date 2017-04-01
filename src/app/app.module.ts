import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppRoutingModule }  from './app.routing';
import { AuthComponent} from './modules/auth/auth.component';
import { UserComponent } from './modules/user/user.component';
import { MerchantComponent } from './modules/merchant/merchant.component';



@NgModule({
  imports:      [ 
  	BrowserModule ,
  	AppRoutingModule
  ],
  declarations: [
  	AppComponent,
  	AuthComponent,
  	UserComponent,
  	MerchantComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
