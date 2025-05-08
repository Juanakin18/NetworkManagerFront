import axios from "../../dependencies/axiosInstance";

class TokensService{



    async addToken(redSocial, usuario, perfil, token){
        var data = {
            tokens:token,
            profile:perfil,
        }
        var result = await axios.post("/"+redSocial+"/tokens/register",{data},{withCredentials:true})
        var resultJSON = await result.data;
        console.log(resultJSON)
        return resultJSON;
    }

}
export default TokensService;