class ProfilesService{

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

    getSelectedProfile(){
        return this.selectedProfile;
    }

    async getAllProfiles(){
            var perfiles = await this.repository.getProfiles("a");
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





}export default ProfilesService;