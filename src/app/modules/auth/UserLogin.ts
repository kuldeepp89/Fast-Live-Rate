export class UserLogin {
    constructor(
        public username: string, 
        public password: string,
        public ipAddress: string
        ){}
}

export class ResponseClass {
  responseCode : number;
  responseMessage : string;
  responseTotalCount : number;
  responseObject : LoginData;
}

export class LoginData {
  userId : number;
  username : string;
  mobile : string;
  name : number;
  roleName : number;
  accessToken :  string;
  storeIds: string;
  isCommentry:number;
  daysLeft: number;
  status: number;
  lastLoginOn: Date;
  expiryOn: Date;
  createdOn:Date;
  roleId: number;
  rolePermissionList : PemissionList[];
}

export class PemissionList {
    id: number;
    moduleName: string;
    controllerName: string;
    actionName: string;
}

export class CreateUser {
    constructor(
        public username: string, 
        public password: string,
        public ipAddress: string
        ){}
}