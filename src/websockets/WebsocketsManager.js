/**
 * Websockets manager
 */
class WebsocketsManager{
    /**
     * Constructor function
     * @param tokensService The tokens service
     * @param setUserID The function which sets the user id
     * @param eventManager The event manager
     */
    constructor(tokensService, setUserID, eventManager) {
        this.tokensService = tokensService;
        this.setUserID = setUserID;
        this.eventManager = eventManager;
    }

    /**
     * Manages a message
     * @param message The received message
     * @param loggedInfo The logged info
     */
    async manageMessage(message, loggedInfo){
        console.log("Mensaje recibido")
        var data = message.data;
        var json = JSON.parse(data);
        console.log(json.msg);
        if(json.type=="userID"){
            this.setUserID(json.id);
            this.eventManager.notify("refreshLogin",{isAsync:true})
        }
        if(json.type=="TOKENS"){
            await this.tokensService.addToken(json.redSocial, loggedInfo, json.profile, json.tokens)
            this.eventManager.notify("redditSelfView",{profile:json.profile,socialMedia:json.redSocial});
            this.eventManager.notify("profileAdded", {isAsync:true});
        }
    }

}export default WebsocketsManager;