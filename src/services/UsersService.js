/**
 * The users service
 */

class UsersService{
    /**
     * The errors map
     */
    errors = {};

    /**
     * Constructor
     * @param repository The users repository
     * @param update The update function
     * @param eventHandler The event handler
     */
    constructor(repository, update, eventHandler) {
        this.repository = repository;
        this.update = update;
        this.loginInfo =null;
        this.pendingLogin=null;
        this.eventHandler=eventHandler;
    }

    /**
     * Logs a user in
     * @param loginInfo The username
     * @param password The password
     * @returns The result
     */
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

    /**
     * Register a user
     * @param user The name
     * @param email The email
     * @param password The password
     * @param repeatPassword The repeated password
     * @returns The result of the operation
     */
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

    /**
     * Checks if the tfa number is correct or not
     * @param loginInput The user
     * @param number The tfa number
     * @returns The result of the check
     */
    async checkTFA(loginInput, number){
        var result = await this.repository.checkTFA(loginInput, number);
        if(result.status == "SUCCESS"){
            this.loginInfo = this.pendingLogin;
            this.eventHandler.notify("loginSuccess", {isAsync:true});
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

    /**
     * Returns the logged user
     * @returns The logged user
     */
    getLoggedUser(){
        return this.loginInfo;
    }

    /**
     * Logs the user out
     */
    async logout(){
        this.loginInfo=null;
        await this.repository.logout();
        this.update();

    }

    /**
     * Gets the information about the logged user from the server
     * @returns The information
     */
    async fetchUserFromServer(){
        var user = await this.repository.getLoggedUser();
        this.loginInfo = user;
        return user;
    }
}

export default UsersService;