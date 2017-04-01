import { NgModule }	from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './modules/auth/auth.component';
import { UserComponent} from './modules/user/user.component';
import { MerchantComponent } from './modules/merchant/merchant.component';


const routes: Routes = [
  { path: '',  redirectTo: 'signin', pathMatch: 'full'},
  { path: 'signin', component: AuthComponent },
  { path: 'user/details', component: UserComponent },
  { path: 'merchant/details', component: MerchantComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '',  pathMatch: 'full' }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}

