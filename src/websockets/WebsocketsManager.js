class WebsocketsManager{
    constructor(tokensService, setUserID, eventManager) {
        this.tokensService = tokensService;
        this.setUserID = setUserID;
        this.eventManager = eventManager;
    }
    async manageMessage(message, loggedInfo){
        console.log("Mensaje recibido")
        var data = message.data;
        var json = JSON.parse(data);
        console.log(json.msg);
        if(json.type=="userID"){
            this.setUserID(json.id);
        }
        if(json.type=="TOKENS"){
            await this.tokensService.addToken(json.redSocial, loggedInfo, json.profile, json.tokens)
            this.eventManager.notify("redditSelfView",{profile:json.profile,socialMedia:json.redSocial});
        }
    }
}export default WebsocketsManager;