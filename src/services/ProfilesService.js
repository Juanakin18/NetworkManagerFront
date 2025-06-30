/**
 * Profiles service
 */
class ProfilesService{

    /**
     * Constructor function
     * @param repository The profiles repository
     * @param getLoggedUser The function which returns the logged user
     * @param eventManager The event manager
     */
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

    /**
     * Checks whether a profile exists
     * @param user The user
     * @param socialMedia The social network
     * @param profile The profile
     * @returns If the profile exists
     */
    async doesProfileExist(user, socialMedia, profile){
        var profiles = await this.getAllProfiles();
        var filteredProfiles = profiles.filter((profileInfo)=>{
            return profileInfo.profile==profile && profileInfo.socialMedia==socialMedia;
        })
        return filteredProfiles.length!=0;
    }

    /**
     * Adds a profile to the database
     * @param profileDTO The profile
     * @returns The result
     */
    async addProfile(profileDTO){

        var fun =  this.addProfileFunctions[profileDTO.socialMedia.toLowerCase()];
        var result = await fun(profileDTO, this.repository);
        var status = result.status;
        if(status==undefined)
            status=result.result;
        if(status == "SUCCESS"){
            this.eventManager.notify("profileAdded", {isAsync:true});
            return "SUCCESS";
        }

        return {
            result:"FAILIURE",
            errors:result.errors
        };
    }

    /**
     * Selects a profile
     * @param profile The profile
     * @param socialMedia The social network
     */
    selectProfile(profile, socialMedia){
        this.selectedProfile[socialMedia]=profile;
        this.eventManager.notify("profileSelected", {isAsync:true});
    }

    /**
     * Returns the selected profile
     * @param socialMedia The social network
     * @returns The selected profile
     */
    getSelectedProfile(socialMedia){
        return this.selectedProfile[socialMedia];
    }

    /**
     * Returns the displayed profile
     * @returns The displayed profile
     */
    getDisplayedProfile(){
        return this.displayedProfile;
    }

    /**
     * Gets the id of a profile
     * @param profile The profile
     * @returns The id
     */
    getProfileID(profile){
        var name = profile.handle;
        if(name==undefined)
            name = profile.name;
        return name;
    }
    /**
     * Refreshes the service
     */
    async refresh(){
        var profile = this.getSelectedProfile(this.socialMedia);
        var selected = this.getProfileID(this.displayedProfile);
        if(profile!="" && profile!=undefined)
        await this.getProfileInfo(selected, this.socialMedia);
    }

    /**
     * Gets the profile information
     * @param profile The profile
     * @param socialMedia The social network
     * @returns The profile information
     */
    async getProfileInfo(profile, socialMedia){
        this.socialMedia=socialMedia;
        var selectedProfile = this.getSelectedProfile(socialMedia)
        var info = await this.repository.getExternalProfileInfo(profile,selectedProfile, socialMedia);
        this.displayedProfile = info;
        return info;
    }

    /**
     * Gets all the profiles from the user
     * @returns The profiles
     */
    async getAllProfiles(){
            var perfiles = await this.repository.getProfiles("a");
            this.selfProfiles= perfiles.profiles;
            return perfiles.profiles;

    }

    /**
     * Sets the profiles
     * @param profiles The profiles
     */
    setProfiles(profiles){
        this.selfProfiles= profiles;
    }

    /**
     * Returns the displayed profile
     * @returns The displayed profile
     */
    getZoomedProfile(){
        return this.zoomedProfile;
    }

    /**
     * Deselects a profile
     * @param profile The profile
     * @param socialMedia The social network
     */
    deselectProfile(profile,socialMedia){
        this.selectedProfile[socialMedia]="";
        this.eventManager.notify("profileSelected", {isAsync:true});
    }
    /**
     * Follows a user
     * @param socialMedia The social media
     * @param profile The user
     * @returns The result
     */
    async follow(socialMedia, profile){
        var selectedProfile = this.getSelectedProfile(socialMedia);
        var result = await this.repository.follow(profile, selectedProfile, socialMedia);
        return result;
    }

    /**
     * Unfollows a user
     * @param socialMedia The social media
     * @param profile The user
     * @returns The result
     */
    async unfollow(socialMedia, profile){
        var selectedProfile = this.getSelectedProfile(socialMedia);
        var result = await this.repository.unfollow(profile, selectedProfile, socialMedia);
        return result;
    }

    /**
     * Gets the list of self profiles
     * @param socialMedia The social media
     * @returns The profiles
     */
    getSelfProfiles(socialMedia="multi"){
        if(socialMedia=="multi"){
            return this.selfProfiles;
        }
        var filtered = this.selfProfiles.filter((profile)=>profile.socialMedia==socialMedia);
        return filtered;
    }

    /**
     * Returns one of the profiles
     * @param index The index
     * @param socialMedia The social media filter
     * @returns The profile
     */
    getSelfProfile(index, socialMedia="multi"){
        if(socialMedia=="multi")
            return this.selfProfiles[index];
        var list = this.selfProfiles.filter((profile)=>profile.socialMedia==socialMedia);
        return list[index];
    }

    /**
     * Finds users by text
     * @param socialMedia The social network
     * @param user The user
     * @param searchTerm The text
     * @param profile The selected profile
     * @returns The profiles
     */
    async findUsers(socialMedia, user, searchTerm, profile){
        var result = await this.repository.findUsers(user, searchTerm, profile, socialMedia);
        this.externalProfiles = result;
        this.socialMedia = socialMedia;
        return this.externalProfiles;
    }

    /**
     * Sets the displayed profile
     * @param profile The profile
     */
    setDisplayedProfile(profile){
        this.displayedProfile=profile;
    }

    /**
     * Gets the profile name
     * @param socialMedia The social media
     * @param profile The profile
     * @returns The name
     */
    getProfileName(socialMedia,profile){
        if(socialMedia=="bluesky"){
            return profile.handle.split(".")[0];
        }
        if(socialMedia=="reddit"){
            return profile.name;
        }
    }

    /**
     * Removes a profile
     * @param profile The profile
     * @param socialMedia The social network
     * @returns The result
     */
    async removeProfile(profile, socialMedia){
        var selected = this.getSelectedProfile(socialMedia);

        var result = await this.repository.removeProfile(profile, socialMedia);
        if(selected==profile)
            this.deselectProfile(profile, socialMedia);
        this.eventManager.notify("profileRemoved", {isAsync:true});
        return result;
    }

    /**
     * Logs into bluesky
     * @param profile The username
     * @param password The password
     * @returns The result
     */
    async loginBluesky(profile, password){
        var result = await this.repository.loginBluesky(profile, password);
        return result;
    }

    /**
     * Refreshes the bluesky tokens
     * @param profile The profile
     * @param password The password
     */
    async refreshTokensBluesky(profile, password){
        var result= await this.loginBluesky(profile,password);
        if(result.result=="SUCCESS"){
            this.hasRefreshed.bluesky=true;
            this.eventManager.notify("tokensRefreshedBluesky", {});
        }
    }

    /**
     * Resets the service
     */
    reset(){
        this.selfProfiles=[];
        this.selectedProfile={
            reddit:"",
            bluesky:""
        }

    }

    /**
     * Returns if a profile has been refreshed
     * @param socialMedia The social network
     * @returns If a profile has been refreshed
     */
    getHasRefreshed(socialMedia){
        return this.hasRefreshed[socialMedia];
    }

    /**
     * Resets the refreshed property
     */
    resetRefreshed(){
        this.hasRefreshed = {
            reddit:false,
            bluesky:false
        }
    }

    /**
     * Checks if a profile is selected
     * @param socialMedia The social network
     * @param profile The profile
     * @returns If it is selected or not
     */
    isSelected(socialMedia, profile){
        var selectedProfile=this.selectedProfile[socialMedia];
        return profile==selectedProfile;
    }




}export default ProfilesService;