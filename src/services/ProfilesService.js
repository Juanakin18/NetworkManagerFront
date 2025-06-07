import eventManager from "../websockets/EventManager";

class ProfilesService{

    constructor(repository, getLoggedUser, eventManager) {
        this.repository = repository;
        this.getLoggedUser = getLoggedUser;
        this.socialMedia="";
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


    async doesProfileExist(user, socialMedia, profile){
        var profiles = await this.getAllProfiles();
        var filteredProfiles = profiles.filter((profileInfo)=>{
            return profileInfo.profile==profile && profileInfo.socialMedia==socialMedia;
        })
        return filteredProfiles.length!=0;
    }

    async addProfile(profileDTO){

        var fun =  this.addProfileFunctions[profileDTO.socialMedia.toLowerCase()];
        var result = await fun(profileDTO, this.repository);
        if(result.result == "SUCCESS"){
            this.eventManager.notify("profileAdded", {isAsync:true});
            return "SUCCESS";
        }

        return {
            result:"FAILIURE",
            errors:result.errors
        };
    }
    selectProfile(profile, socialMedia){
        this.selectedProfile[socialMedia]=profile;
        this.eventManager.notify("profileSelected", {isAsync:true});
    }

    getSelectedProfile(socialMedia){
        return this.selectedProfile[socialMedia];
    }
    getDisplayedProfile(){
        return this.displayedProfile;
    }

    getProfileID(profile){
        var name = profile.handle;
        if(name==undefined)
            name = profile.name;
        return name;
    }
    async refresh(){
        var profile = this.getSelectedProfile(this.socialMedia);
        var selected = this.getProfileID(this.displayedProfile);
        if(profile!="" && profile!=undefined)
        await this.getProfileInfo(selected, this.socialMedia);
    }

    async getProfileInfo(profile, socialMedia){
        this.socialMedia=socialMedia;
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

    setProfiles(profiles){
        this.selfProfiles= profiles;
    }
    getZoomedProfile(){
        return this.zoomedProfile;
    }

    deselectProfile(profile,socialMedia){
        this.selectedProfile[socialMedia]="";
        this.eventManager.notify("profileSelected", {isAsync:true});
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

    getSelfProfile(index){
        return this.selfProfiles[index];
    }
    async findUsers(socialMedia, user, searchTerm, profile){
        var result = await this.repository.findUsers(user, searchTerm, profile, socialMedia);
        this.externalProfiles = result;
        this.socialMedia = socialMedia;
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
        var selected = this.getSelectedProfile(socialMedia);

        var result = await this.repository.removeProfile(profile, socialMedia);
        if(selected==profile)
            this.deselectProfile(profile, socialMedia);
        this.eventManager.notify("profileRemoved", {isAsync:true});
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
            this.eventManager.notify("tokensRefreshedBluesky", {});
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