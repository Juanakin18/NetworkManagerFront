import usersRepository from "../repositories/UsersRepository";

class UsersService{
    errors = {};

    constructor(repository, update) {
        this.repository = repository;
        this.update = update;
        this.loginInfo =null;
        this.pendingLogin=null;
    }

    async login(loginInfo, password){
        var loginDTO = {
            loginInfo:loginInfo,
            password:password
        }
        var result = await this.repository.checkLogin(loginDTO);
        if(result.status == "SUCCESS"){
           this.pendingLogin = loginInfo;
            return {result : result.status}
        }else{
            return {
                result: "ERROR",
                errors:result.errors
            };
        }
    }

    async signup(user, email, password, repeatPassword){
        var userDTO = {
            name:user,
            email:email,
            password:password,
            repeatPassword:repeatPassword
        }

        var result = await this.repository.addUser(userDTO);
        if(result.status == "SUCCESS")
            return {
                result: "SUCCESS",
            };
        else
            return {
                result: "ERROR",
                errors:result.errors
            };
    }

    async checkTFA(loginInput, numero){
        var result = await this.repository.checkTFA(loginInput, numero);
        if(result.status == "SUCCESS"){
            this.loginInfo = this.pendingLogin;
            this.update();
            return {
                result: "SUCCESS",
                token:result.token
            };
        }
        else
            return {
                result: "ERROR",
                errors:result.errors
            };
    }
    pushErrors(campo, error){
        var erroresCampo = this.errors[campo];
        if(erroresCampo ==undefined){
            erroresCampo = [];
        }
        erroresCampo.push(error);
        this.errors[campo]= erroresCampo;
    }

    checkHasNoErrors(){
        var map = new Map(Object.entries(this.errors));
        var keys = Array.from(map.keys());
        for(var i =0; i<keys.length; i++){
            if(this.errors[keys[i]].length >0)
                return false;
        }
        return true;
    }
    getLoggedUser(){
        return this.loginInfo;
    }
    async logout(){
        this.loginInfo=null;
        await this.repository.logout();
        this.update();

    }
    async fetchUserFromServer(){
        var user = await this.repository.getLoggedUser();
        this.loginInfo = user;
        return user;
    }
}

export default UsersService;