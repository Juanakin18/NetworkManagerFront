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

    getTokensUser(usuario, redSocial){
        var tokensUser = this.tokens[usuario];
        if(tokensUser==undefined){
            tokensUser = new Map();
        }
        var tokensUserRed = tokensUser[redSocial];
        if(tokensUserRed==undefined){
            tokensUserRed = new Map();
        }
        tokensUser[redSocial]=tokensUserRed;
        return tokensUserRed;
    }

    getTokensUserRed(redSocial, usuario, perfil){
        var tokensUser = this.getTokensUser(usuario, redSocial);
        return tokensUser[perfil];
    }
}
export default TokensService;