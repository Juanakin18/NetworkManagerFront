import axios from "axios";

class ProfilesRepository{
    constructor(client) {
        this.client=client;
    }

    async addProfile(profileDTO, repo){
        try{
            var result = await repo.client.post("http://localhost:3000/profiles/add",{
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

    async addProfileBluesky(profileDTO, repo){
        try{
            var result = await repo.client.post("http://localhost:3000/bluesky/login",{
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
            }
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async addProfileReddit(profileDTO, repo){
        try{

            var query = "user="+profileDTO.user+"&userID="+profileDTO.userID+"&profile="+profileDTO.profile;
            var result = await repo.client.get("http://127.0.0.1:3000/reddit/login?"+query);
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

    async removeProfile(profileDTO, repo){
        try{
            var result = await repo.client.post("http://localhost:3000/profiles/remove",{
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

    async getProfiles(profileDTO, repo){
        try{
            var result = await repo.class.get("http://localhost:3000/profiles/"+profileDTO+"/all",);
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

    async getProfile(profileDTO, repo){
        try{
            var result = await repo.client.get("http://localhost:3000/profiles/"+profileDTO.email+"?socialMedia="+profileDTO.socialMedia+"&profile="+profileDTO.name);
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

}

export default ProfilesRepository;