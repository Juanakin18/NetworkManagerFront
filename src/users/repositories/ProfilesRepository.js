import axios from "axios";

class ProfilesRepository{

    async addProfile(profileDTO){
        try{
            var result = await axios.post("http://localhost:3000/profiles/add",{
                loggedInfo:profileDTO.loginInfo,
                socialMedia:profileDTO.socialMedia,
                password:profileDTO.password,
                email:profileDTO.email});
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
            var result = await axios.get("http://localhost:3000/profiles/"+profileDTO.email+"/all",);
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

}

export default ProfilesRepository;