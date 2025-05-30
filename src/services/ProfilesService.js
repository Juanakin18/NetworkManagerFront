class ProfilesService{

    constructor(repository, getLoggedUser, eventManager) {
        this.repository = repository;
        this.getLoggedUser = getLoggedUser;
        this.externalProfiles=[];
        this.selfProfiles=[];
        this.selectedProfile = {
            reddit:"",
            bluesky: ""
        }
        this.displayedProfile = {};
        this.addProfileFunctions={
            reddit: this.repository.addProfileReddit,
            bluesky: this.repository.addProfileBluesky
        };
        this.hasRefreshed={
            reddit:false,
            bluesky:false
        }
        this.eventManager=eventManager;
    }


    async addProfile(profileDTO){

        var fun =  this.addProfileFunctions[profileDTO.socialMedia.toLowerCase()];
        var result = await fun(profileDTO, this.repository);
        if(result.result == "SUCCESS")
            return "SUCCESS";
        return {
            result:"FAILIURE",
            errors:result.errors
        };
    }
    selectProfile(profile, socialMedia){
        this.selectedProfile[socialMedia]=profile;
        this.eventManager.notify("profileSelected");
    }

    getSelectedProfile(socialMedia){
        return this.selectedProfile[socialMedia];
    }
    getDisplayedProfile(){
        return this.displayedProfile;
    }

    async getProfileInfo(profile, socialMedia){
        var selectedProfile = this.getSelectedProfile(socialMedia)
        var info = await this.repository.getExternalProfileInfo(profile,selectedProfile, socialMedia);
        this.displayedProfile = info;
        return info;
    }

    async getAllProfiles(){
            var perfiles = await this.repository.getProfiles("a");
            this.selfProfiles= perfiles.profiles;
            return perfiles.profiles;

    }

    getZoomedProfile(){
        return this.zoomedProfile;
    }

    deselectProfile(red){
        this.selectedProfile[red]=null;
        this.eventManager.notify("profileSelected");
    }

    async follow(socialMedia, profile){
        var selectedProfile = this.getSelectedProfile(socialMedia);
        var result = await this.repository.follow(profile, selectedProfile, socialMedia);
        return result;
    }
    async unfollow(socialMedia, profile){
        var selectedProfile = this.getSelectedProfile(socialMedia);
        var result = await this.repository.unfollow(profile, selectedProfile, socialMedia);
        return result;
    }






    getSelfProfiles(){
        return this.selfProfiles;
    }

    async findUsers(socialMedia, user, searchTerm, profile){
        var result = await this.repository.findUsers(user, searchTerm, profile, socialMedia);
        this.externalProfiles = result;
        return this.externalProfiles;
    }

    setDisplayedProfile(profile){
        this.displayedProfile=profile;
    }

    getProfileName(socialMedia,profile){
        if(socialMedia=="bluesky"){
            return profile.handle.split(".")[0];
        }
        if(socialMedia=="reddit"){
            return profile.name;
        }
    }

    async removeProfile(profile, socialMedia){
        var result = await this.repository.removeProfile(profile, socialMedia);
        return result;
    }

    async loginBluesky(profile, password){
        var result = await this.repository.loginBluesky(profile, password);
        return result;
    }
    async refreshTokensBluesky(profile, password){
        var result= await this.loginBluesky(profile,password);
        if(result.result=="SUCCESS"){
            this.hasRefreshed.bluesky=true;
            this.eventManager.notify("tokensRefreshedBluesky");
        }
    }

    reset(){
        this.selfProfiles=[];
        this.selectedProfile={
            reddit:"",
            bluesky:""
        }

    }

    getHasRefreshed(socialMedia){
        return this.hasRefreshed[socialMedia];
    }

    resetRefreshed(){
        this.hasRefreshed = {
            reddit:false,
            bluesky:false
        }
    }




}export default ProfilesService;