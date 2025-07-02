import axios from "../dependencies/axiosInstance"

/**
 * Profiles repository
 */
class ProfilesRepository{


    /**
     * Adds a profile
     * @param profileDTO The profile
     * @returns The result
     */
    async addProfile(profileDTO){
        try{
            var result = await axios.post("/profiles/add",{
                loggedInfo:profileDTO.loginInfo,
                socialMedia:profileDTO.socialMedia,
                password:profileDTO.password,
                user:profileDTO.profile});
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Logs into bluesky
     * @param profile The user handle
     * @param password The password
     * @returns The result
     */
    async loginBluesky(profile, password){
        try{
            var result = await axios.post("/bluesky/login",{
                password:password,
                username:profile});
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Adds a bluesky profile
     * @param profileDTO The profile
     * @param repo The repository
     * @returns The result
     */
    async addProfileBluesky(profileDTO, repo=this){
        try{
            var result = await axios.post("/bluesky/login",{
                loggedInfo:profileDTO.loginInfo,
                socialMedia:profileDTO.socialMedia,
                password:profileDTO.password,
                username:profileDTO.profile});
            var resultJSON = await result.data;
            if(result.status == 200){
                var resultAdd = await repo.addProfile(profileDTO);
                if(resultAdd.status!="SUCCESS"){
                    return {
                        result: "FAILIURE",
                        errors:resultAdd
                    }
                }else{
                    return resultAdd;
                }
            }
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Adds a reddit profile
     * @param profileDTO The profile
     * @returns The result
     */
    async addProfileReddit(profileDTO){
        try{
            var query = "user="+profileDTO.user+"&userID="+profileDTO.userID+"&profile="+profileDTO.profile;
            var result = await axios.get("/reddit/login?"+query);
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Removes a profile
     * @param profile The profile
     * @param socialMedia The social network
     * @returns The result
     */
    async removeProfile(profile, socialMedia){
        try{
            var result = await axios.post("/profiles/remove",{
                profile:profile,
                socialMedia:socialMedia});
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Gets all the profiles from a user
     * @param user The user
     * @returns The profiles
     */
    async getProfiles(user){
        try{
            var result = await axios.get("/profiles/"+user+"/all",);
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Gets information about a profile
     * @param profileDTO The profile
     * @returns The information
     */
    async getProfile(profileDTO){
        try{
            var result = await axios.get("http://localhost:3000/profiles/"+profileDTO.email+"?socialMedia="+profileDTO.socialMedia+"&profile="+profileDTO.name);
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Gets information about an external profile
     * @param profile The profile
     * @param selectedProfile The selected profile
     * @param socialMedia The social network
     * @returns The information
     */
    async getExternalProfileInfo(profile,selectedProfile, socialMedia){
        try{
            var result = await axios.get("/"+socialMedia+"/users/info?selectedProfile="+selectedProfile+"&user="+profile);
            var resultJSON = await result.data;
            return resultJSON.data;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }
    /**
     * Unfollows a profile
     * @param profile The profile
     * @param currentProfile The selected profile
     * @param socialMedia The social network
     * @returns The result
     */
    async unfollow(profile, currentProfile, socialMedia){
        try{
            var result = await axios.post("/"+socialMedia+"/profiles/unfollow",{
                profile:currentProfile,
                socialMedia:socialMedia,
                profileToUnfollow:profile});
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Follows a profile
     * @param profile The profile
     * @param currentProfile The selected profile
     * @param socialMedia The social network
     * @returns The result
     */
    async follow(profile, currentProfile, socialMedia){
        try{
            var result = await axios.post("/"+socialMedia+"/profiles/follow",{
                profile:currentProfile,
                profileToFollow:profile});
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

    /**
     * Finds external profiles by text
     * @param query The text
     * @param searchTerm The search term
     * @param currentProfile The selected profile
     * @param socialMedia The social media
     * @returns A list of external profiles
     */
    async findUsers(query, searchTerm, currentProfile, socialMedia){
        try{
            var result = await axios.get("/"+socialMedia+"/users/search?q="+query+"&selectedProfile="+currentProfile);
            var resultJSON = await result.data;
            return resultJSON.data;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                return errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }

}

export default ProfilesRepository;