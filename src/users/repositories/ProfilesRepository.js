import axios from "axios";

class ProfilesRepository{

    async addProfile(profileDTO){
        try{
            var result = await axios.post("http://localhost:3000/profiles/add",{
                loggedInfo:profileDTO.loginInfo,
                socialMedia:profileDTO.socialMedia,
                password:profileDTO.password,
                email:profileDTO.email});

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

    async addProfileBluesky(profileDTO){
        try{
            var result = await axios.post("http://localhost:3000/bluesky/login",{
                loggedInfo:profileDTO.loginInfo,
                socialMedia:profileDTO.socialMedia,
                password:profileDTO.password,
                username:profileDTO.email});
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida - Login Bluesky")

            var resultJSON = await result.data;
            if(resultJSON.status == 200){
                var resultAdd = await this.addProfile(profileDTO);
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

    async addProfileReddit(profileDTO){
        try{

            var query = "user="+profileDTO.user+"&userID="+profileDTO.userID+"&profile="+profileDTO.profile;
            var result = await axios.get("http://localhost:3000/reddit/login?"+query);
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
            var result = await axios.post("http://localhost:3000/profiles/remove",{
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

    async getProfiles(profileDTO){
        try{
            var result = await axios.get("http://localhost:3000/profiles/"+profileDTO+"/all",);
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

}

export default ProfilesRepository;