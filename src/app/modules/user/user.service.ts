import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserLogin } from '../auth/UserLogin';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

	constructor (private http: Http) {}

	private getUserListUrl = 'http://localhost:8885/webservice/user/getList';  
    private apiUrl: string;
 

    getUserList(requestJson: any): Observable<UserLogin> {
    	console.log("getUserList service"+requestJson);
	    let body = JSON.stringify(requestJson); 
	    let headers = new Headers({ 'Content-Type': 'application/json', 'accessToken': requestJson });
	    let options = new RequestOptions({ headers: headers });

	    return this.http.get(this.getUserListUrl, options)
	      .map((res:Response) => res.json())
	      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	  }

}