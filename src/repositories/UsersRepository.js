import axios from "../dependencies/axiosInstance"

/**
 * Users repository
 */
class UsersRepository{
    /**
     * Checks the two-factor authentication number
     * @param loginInfo The username
     * @param number The number
     * @returns If it is correct or not
     */
    async checkTFA(loginInfo, number){
        try{
            var result = await axios.post("/login/2fa",{user:loginInfo, number:number},{withCredentials: true});
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Adds a user
     * @param user The user data
     * @returns The result
     */
    async addUser(user){
        try{
            var result = await axios.post("/signup",{user:user},{withCredentials: true})
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {

            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Logs the current user out
     * @returns The result
     */
    async logout(){
        try{
            var result = await axios.post("/logout",{},{withCredentials: true})
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Checks the login information
     * @param loginDTO The login information
     * @returns The result of the check
     */
    async checkLogin(loginDTO){
        try{
            var result = await axios.post("/login",{user:loginDTO},{withCredentials: true})
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            console.log(e)
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Gets the information about the current logged user
     * @returns The information
     */
    async getLoggedUser(){
        try{
            var result = await axios.get("/user/loggedUser",{withCredentials: true});
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                errors=errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }
}

export default UsersRepository;