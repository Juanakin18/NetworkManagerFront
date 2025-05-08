class ProfilesService{

    constructor(repository, tokenManager, getLoggedUser) {
        this.repository = repository;
        this.tokenManager = tokenManager;
        this.getLoggedUser = getLoggedUser;
        this.selfProfiles=[];
        this.selectedProfile = {
            reddit:{},
            bluesky: {}
        }
        this.followMap = new Map();
        this.displayedProfile = {};
        this.addProfileFunctions={
            reddit: this.repository.addProfileReddit,
            bluesky: this.repository.addProfileBluesky
        }

    }

    async addProfile(profileDTO){

        var fun =  this.addProfileFunctions[profileDTO.socialMedia.toLowerCase()];
        var result = await fun(profileDTO);
        if(result.result == "SUCCESS")
            return "SUCCESS";
        return "FAILIURE";
    }

    async selectProfile(user, red, profile){
        var perfil = await this.repository.getProfile(user, red,profile);
        if(perfil!=undefined){
            this.selectedProfile = perfil;
        }
    }

    async selectProfile(red, profile){
        this.selectedProfile(this.getLoggedUser(), red, profile);
    }

    getSelectedProfile(red){
        return this.selectedProfile[red];
    }
    getDisplayedProfile(){
        return this.displayedProfile;
    }

    async getProfileInfo(profile){
        var info = await this.repository.getExternalProfileInfo(profile,this.selectedProfile);
        return info;
    }

    async getAllProfiles(){
            var perfiles = await this.repository.getProfiles("a");
            this.selfProfiles= perfiles;
            return perfiles.profiles;

    }

    zoomProfile(profileLogin, socialMedia){
        this.zoomedProfile= {loginInfo:profileLogin,socialMedia:socialMedia};
    }

    getZoomedProfile(){
        return this.zoomedProfile;
    }

    isItYours(){
        return this.zoomedProfile.isItYours;
    }

    deselectProfile(){
        this.selectedProfile=null;
    }

    async follow(profile, feed){
        var result = await this.repository.follow(profile, feed);
        this.feedsList = result;
        this.addToFollow(profile, feed);
        return result;
    }

    addToFollow(profile){
        var followsRed = this.followMap[profile.redSocial];
        if (followsRed == undefined){
            followsRed = new Map();
        }
        var followsProfile = followsRed[profile.name];
        if(followsProfile==undefined)
            followsProfile = [];
        if(!followsProfile.includes(profile.name))
            followsProfile.push(profile.name);

        this.followMap[profile.redSocial]=followsRed;
    }

    removeFromFollow(profile){
        var followsRed = this.followMap[profile.redSocial];
        if (followsRed == undefined){
            followsRed = new Map();
        }
        var followsProfile = followsRed[profile.name];
        if(followsProfile==undefined)
            followsProfile = [];
        followsProfile=followsProfile.filter((userName)=>userName!=profile.name)
        followsRed[profile.name]=followsProfile;
        this.followMap[profile.redSocial]=followsRed;
    }

    async unfollow(socialMedia, profile){
        var result = await this.repository.unfollow(profile, this.selectedProfile[socialMedia], socialMedia);
        this.feedsList = result;
        this.removeFromFollow(profile, socialMedia);
        return result;
    }

    getSelfProfiles(){
        return this.selfProfiles;
    }







}export default ProfilesService;