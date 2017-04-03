import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserLogin } from './UserLogin';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
     private commentsUrl = 'http://localhost:8885/webservice/login/userLogin'; 
     private logoutUrl = 'http://localhost:8885/webservice/login/logout'; 
     private apiUrl: string;

     login (body: Object): Observable<UserLogin[]> {
     	console.log("login service"+body);
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json', 'appKey': 'web-8765437-atkey' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.commentsUrl, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    } 

    logout(requestJson: any): Observable<UserLogin> {
    	console.log("logout service"+requestJson.accessToken);
	    let body = JSON.stringify(requestJson); 
	    let headers = new Headers({ 'Content-Type': 'application/json', 'accessToken': requestJson.accessToken });
	    let options = new RequestOptions({ headers: headers });

	    return this.http.put(this.logoutUrl, body, options)
	      .map((res:Response) => res.json())
	      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	  }

}