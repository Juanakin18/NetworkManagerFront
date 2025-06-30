import axios from "../dependencies/axiosInstance";

/**
 * Tokens service
 */
class TokensService{

    /**
     * Constructor funcion
     */
    constructor() {
        this.isRefreshed=false;
    }

    /**
     * Sets if the tokens have been refreshed or not
     * @param value If they have been refreshed or not
     */
    setIsRefreshed(value){
        this.isRefreshed=value;
    }

    /**
     * Returns if a token has been refreshed
     * @returns If a token has been refreshed
     */
    getIsRefreshed(){
        return this.isRefreshed;
    }

    /**
     * Adds a token
     * @param socialMedia The social network
     * @param user The user
     * @param profile The profile
     * @param token The token
     * @returns The result
     */
    async addToken(socialMedia, user, profile, token){
        var data = {
            tokens:token,
            profile:profile,
        }
        var result = await axios.post("/"+socialMedia+"/tokens/register",{data},{withCredentials:true})
        var resultJSON = await result.data;
        return resultJSON;
    }

}
export default TokensService;