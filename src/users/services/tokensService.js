class TokensService{

    tokens = new Map();

    addToken(redSocial, usuario, perfil, token){
        var tokensUser = this.getTokensUser(usuario, redSocial);
        tokensUser[perfil]=token;
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