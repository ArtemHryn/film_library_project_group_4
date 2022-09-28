export class UserInfo {
    constructor() {
        this.USER_ID = 0;
        this.userName = '';
        this.isLogIn = false;
    }
    set UserID(NewId) {
        this.USER_ID = NewId;
    }
    get UserID() {
        return this.USER_ID
    }
    resetUser_ID() {
        this.USER_ID=0
    }
    set UserName(NewName) {
        this.userName = NewName;
    }
    get UserName() {
        return this.userName;
    }
    resetUserName() {
        this.userName = '';
    }
    set IsLogIn(NewLog) {
        this.isLogIn = NewLog;
    }
    get IsLogIn() {
        return this.isLogIn
    }
    resetIsLogIn() {
        isLogIn = false;
    }

}