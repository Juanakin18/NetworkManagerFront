class ProfilesService{

    selectedProfile = null;
    profileList = null;

    selectedTokens = null;




    constructor(repository, tokenManager, getLoggedUser) {
        this.repository = repository;
        this.tokenManager = tokenManager;
        this.getLoggedUser = getLoggedUser;
        this.addProfileFunctions={
            reddit: this.repository.addProfileReddit,
            bluesky: this.repository.addProfileBluesky
        }

    }



    async addProfile(profileDTO){

        var result = await this.addProfileFunctions[profileDTO.socialMedia](profileDTO);
        if(result.result == "SUCCESS")
            return "SUCCESS";
        return "FAILIURE";
    }

    async selectProfile(user, red, profile){
        var perfil = await this.repository.getProfile(user, red,profile);
        if(perfil!=undefined){
            this.selectedProfile = perfil;
            this.selectedTokens = this.tokenManager.getTokensUserRed(user,red,profile);
        }
    }

    async selectProfile(red, profile){
        this.selectedProfile(this.getLoggedUser(), red, profile);
    }

    async getAllProfiles(user){
        var perfiles = await this.repository.getProfiles(user);
        return perfiles;
    }

    async getToken(user, red, profile){
        return this.tokenManager.getTokensUserRed(user,red,profile);
    }
}export default ProfilesService;