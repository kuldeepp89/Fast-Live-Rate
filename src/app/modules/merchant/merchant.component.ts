import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { UserLogin, ResponseClass , LoginData } from '../auth/UserLogin';
import { LoginService } from '../auth/login.service';

@Component({
	moduleId: module.id,
	selector: 'merchant-component',
	templateUrl: 'merchant.component.html',
	styleUrls: ['style.css']
})
export class MerchantComponent  {

}
