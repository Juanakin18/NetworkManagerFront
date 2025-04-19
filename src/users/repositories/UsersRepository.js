import axios from "axios";

class UsersRepository{
    async checkTFA(loginInfo, number){
        try{
            var result = await axios.post("http://localhost:3000/login/2fa",{user:loginInfo, number:number});
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
            var result = await axios.post("http://localhost:3000/signup",{user:user})
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
            var result = await axios.post("http://localhost:3000/login",{user:loginDTO})

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
}

export default UsersRepository;