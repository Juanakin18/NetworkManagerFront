import axios from "../dependencies/axiosInstance"
class UsersRepository{
    async checkTFA(loginInfo, number){
        try{
            var result = await axios.post("/login/2fa",{user:loginInfo, number:number},{withCredentials: true});
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - checkTFA")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }
    async addUser(user){
        try{
            var result = await axios.post("/signup",{user:user},{withCredentials: true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async logout(){
        try{
            var result = await axios.post("/logout",{},{withCredentials: true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async checkLogin(loginDTO){
        try{
            console.log(loginDTO)
            var result = await axios.post("/login",{user:loginDTO},{withCredentials: true})

            console.log("Respuesta de inicio de sesión recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async getLoggedUser(){
        try{
            var result = await axios.get("/user/loggedUser",{withCredentials: true});
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Add Profile")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON.user;
        }catch (e) {
            console.log(e)
            var message= e.response;
            if(message == undefined)
                message = e.stack;
            console.error(message);
            return message;
        }
    }
}

export default UsersRepository;