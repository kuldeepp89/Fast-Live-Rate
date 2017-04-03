import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm }    from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';
import { UserLogin, ResponseClass , LoginData } from './UserLogin';
import { LoginService } from './login.service';
import { LocalStorageService } from 'ng2-webstorage';

@Component({
	moduleId: module.id,
	selector: 'auth-component',
	templateUrl: 'auth.component.html',
	styleUrls: ['style.css']
})
export class AuthComponent  implements OnInit {

	private responseClass: ResponseClass;
	private loginFailed = false;
	private errorMessage: string = "";
	private loginData: LoginData;

	constructor(
        private loginService: LoginService,
        private router: Router,
        private localSt: LocalStorageService
        ){}

	ngOnInit() {
      if (this.localSt.retrieve("isLoggedIn") == true) {
	      // redirect page to dashboard
	      if(this.localSt.retrieve("loginData").roleId==1){
 				this.router.navigate(['/user/details']);
	      }
	      else{
	      	    this.router.navigate(['/merchant/details']);
	      }
	      
	    } else {
	      this.router.navigate(['']);
	  }
	}

	private model = new UserLogin('', '','127.0.0.1');
	//@Input() userLogin: UserLogin;

	submitComment(){
        // Variable to hold a reference of addComment/updateComment
        let loginOperation:Observable<UserLogin[]>;
        loginOperation = this.loginService.login(this.model)
        
        console.log("a"+loginOperation);
        // Subscribe to observable
        loginOperation.subscribe(
                                userLogin => {
                                    // Emit list event
                                    /*EmitterService.get(this.listId).emit(userLogin);*/
                                    
                                    // Empty model
                                    console.log("suc1");
                                    this.login(userLogin);
                                    this.model = new UserLogin('', '','127.0.0.1');
                                    // Switch editing status
                                    //if(this.editing) this.editing = !this.editing;
                                }, 
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
    }


    login(data: any) {
    this.responseClass = data as ResponseClass;
    if (this.responseClass.responseCode == 1) {
      // set login value in localStorage 
      this.createLoginStorage(this.responseClass.responseObject);
      // redirect page to dashboard
      console.log(this.loginData.roleId);
      if(this.loginData.roleId==1){
   			this.router.navigate(['/user/details']);
      }
      else{
      		this.router.navigate(['/merchant/details']);
	  }
      
    }
    else {
      this.localSt.store('isLoggedIn', false);
      this.loginFailed = true;
      // this.logIn.password = "";
      console.log(this.responseClass.responseMessage);
      this.errorMessage = this.responseClass.responseMessage;
      setTimeout(function () {
        this.errorMessage = "";
      }.bind(this), 5000);
    }
   }

   createLoginStorage(responseObject: any) {
    this.loginData = this.setLoginData(responseObject);
    console.log(this.loginData);
    this.localSt.store('isLoggedIn', true);
    this.localSt.store('loginData', this.loginData);
  }

  setLoginData(responseObject: any) {
    this.loginData = responseObject as LoginData;
    return this.loginData;
  }

}
