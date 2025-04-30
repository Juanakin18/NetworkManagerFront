
class UsersService{
    errors = {};

    constructor(repository, update) {
        this.repository = repository;
        this.update = update;
        this.loginInfo =null;
        this.pendingLogin=null;
    }

    async login(loginInfo, password){
        console.log(loginInfo)
        var loginDTO = {
            loginInfo:loginInfo,
            password:password
        }
        console.log(loginDTO)
        var result = await this.repository.checkLogin(loginDTO);
        console.log("UsersService.login")
        console.log(result);

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
            password:password
        }

        if(password!=repeatPassword){
            this.pushErrors("password", "Las contraseñas no coinciden");
        }

        if(!email.includes("@")){
            this.pushErrors("email","El email debe contener un @");
        }

        if(!email.includes(".")){
            this.pushErrors("email","El email debe contener un .");
        }

        var errors = this.errors;

        var hasErrors= this.checkHasNoErrors();
        this.errors={};

        if(hasErrors){
            console.log("Llamando a la API");
            var result = await this.repository.addUser(userDTO);
            console.log("Resultado de addUser")
            console.log(result)
            if(result.status == "SUCCESS")
                return {
                    result: "SUCCESS",
                };
            else
                return {
                    result: "ERROR",
                    errors:result.errors
                };
        }else{
            return {
                result:"ERROR",
                errors:errors
            }
        }
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
    logout(){
        this.loginInfo=null;
        this.update();
    }
}

export default UsersService;