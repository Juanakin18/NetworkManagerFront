import axios from "../../dependencies/axiosInstance"

class ProfilesRepository{


    async addProfile(profileDTO){
        try{
            var result = await axios.post("/profiles/add",{
                loggedInfo:profileDTO.loginInfo,
                socialMedia:profileDTO.socialMedia,
                password:profileDTO.password,
                user:profileDTO.profile});

            console.log("Respuesta recibida - Add Profile")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async addProfileBluesky(profileDTO, repo=this){
        try{
            var result = await axios.post("/bluesky/login",{
                loggedInfo:profileDTO.loginInfo,
                socialMedia:profileDTO.socialMedia,
                password:profileDTO.password,
                username:profileDTO.profile});
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Login Bluesky")

            var resultJSON = await result.data;
            if(result.status == 200){
                var resultAdd = await repo.addProfile(profileDTO);
                console.log(resultAdd);
                if(resultAdd.result!="SUCCESS"){
                    return {
                        result: "FAILIURE",
                        errors:resultAdd
                    }
                }else{
                    return resultAdd;
                }
            }
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async addProfileReddit(profileDTO){
        try{

            var query = "user="+profileDTO.user+"&userID="+profileDTO.userID+"&profile="+profileDTO.profile;
            var result = await axios.get("/reddit/login?"+query);
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Add Profile")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async removeProfile(profileDTO){
        try{
            var result = await axios.post("/profiles/remove",{
                loggedInfo:profileDTO.loginInfo,
                socialMedia:profileDTO.socialMedia,
                email:profileDTO.email});
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Remove Profile")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async getProfiles(user){
        try{
            var result = await axios.get("/profiles/"+user+"/all",);
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Get Profiles")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async getProfile(profileDTO){
        try{
            var result = await axios.get("http://localhost:3000/profiles/"+profileDTO.email+"?socialMedia="+profileDTO.socialMedia+"&profile="+profileDTO.name);
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Get Profile")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }
    async getExternalProfileInfo(profile,selectedProfile, socialMedia){
        try{
            var result = await axios.get("/"+socialMedia+"/users/info?selectedProfile="+selectedProfile+"&user="+profile);
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Get Profile")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON.data;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }
    async unfollow(profile, currentProfile, socialMedia){
        try{
            var result = await axios.post("/"+socialMedia+"/profiles/unfollow",{
                currentProfile:currentProfile,
                socialMedia:socialMedia,
                profile:profile});
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Remove Profile")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async follow(profile, currentProfile, socialMedia){
        try{
            var result = await axios.post("/"+socialMedia+"/profiles/follow",{
                profile:currentProfile,
                profileToFollow:profile});
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Remove Profile")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async findUsers(query, searchTerm, currentProfile, socialMedia){
        try{
            var result = await axios.get("/"+socialMedia+"/users/search?q="+query+"&selectedProfile="+currentProfile);

            console.log("Respuesta recibida - Get Profile")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON.data;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

}

export default ProfilesRepository;