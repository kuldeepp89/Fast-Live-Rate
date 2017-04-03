import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { UserLogin, ResponseClass , LoginData } from '../auth/UserLogin';
import { LoginService } from '../auth/login.service';
import { UserService } from './user.service';
@Component({
	moduleId: module.id,
	selector: 'user-component',
	templateUrl: 'user.component.html',
	styleUrls: ['style.css'],
})
export class UserComponent  implements OnInit {

	private loginData: LoginData;
	public userLoginDetails: LoginData= new LoginData();
	private responseClass: ResponseClass;
	private errorMessage: string = "";
	private userList: LoginData[]= [];
	user: any;
	showStyle: false;

	constructor(
		private router: Router,
		private localSt: LocalStorageService,
		private logInService: LoginService,
		private userService: UserService
		){}

	ngOnInit() {
		this.loginData=this.localSt.retrieve("loginData") as LoginData; 
		if (this.localSt.retrieve("isLoggedIn") == true) {
			// redirect page to dashboard
			if(this.localSt.retrieve("loginData").roleId==1){
				this.router.navigate(['/user/details']);
				this.getUserList();
			}
			else{
				this.router.navigate(['/merchant/details']);
			}

		} else {
			this.router.navigate(['']);
		}
	}

	getUserList(){
		// Variable to hold a reference of addComment/updateComment
		console.log("userlist called");
		let userOperation:Observable<UserLogin>;
		userOperation = this.userService.getUserList(this.localSt.retrieve("loginData").accessToken)

		// Subscribe to observable
		userOperation.subscribe(
			userList => {
				// Emit list event
				/*EmitterService.get(this.listId).emit(userLogin);*/

				// Empty model
				console.log("suc1");
				this.assignUserList(userList);
				//this.model = new UserLogin('', '','127.0.0.1');
				// Switch editing status
				//if(this.editing) this.editing = !this.editing;
			}, 
			err => {
				// Log errors if any
				console.log(err);
			});
	}


	assignUserList(data : any) {
		console.log("getList called");
		this.responseClass = data as ResponseClass;


		if (this.responseClass.responseCode == 1) {
			//this.userList = this.responseClass.responseObject as LoginData[];
			this.createLoginStorage(this.responseClass.responseObject);
			console.log(this.userList);
		}

	}

	createLoginStorage(responseObject: any) {
		this.userList = responseObject as LoginData[];
		return this.userList;
	}

	getStyle() {
		if(this.showStyle) {
			return "block";
		} else {
			return "none";
		}
	}


	logout() {
		console.log("comes in logout");
		this.userLoginDetails.accessToken = this.loginData.accessToken;
		this.logInService.logout(this.userLoginDetails)
		.subscribe(
			data => {
				this.logoutFinal(data);
			},
			error => { this.errorMessage = <any>error; });
	}

	logoutFinal(data: any) {
		this.responseClass = data as ResponseClass;
		if (this.responseClass.responseCode == 1) {
			// set login value in localStorage 
			this.localSt.store("isLoggedIn", false);
			this.localSt.clear("loginData");
			// redirect page to dashboard
			console.log(this.loginData.roleId);
			this.router.navigate(['']);  
		}
		else {
			console.log(this.responseClass.responseMessage);
			this.errorMessage = this.responseClass.responseMessage;

		}
	}


	updateUser(user: any) {
		console.log(user);
		this.user = user;

	}



}
