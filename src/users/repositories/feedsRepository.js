import axios from "../../dependencies/axiosInstance";

class FeedsRepository{

    feedNames = {
        reddit:"subreddit",
        bluesky:"feed"
    }
    async unfollow(perfil, feed){
        try{

            var data = {
                profile:perfil,
                feed:feed.name
            }

            var result = await axios.post("/"+perfil.socialMedia+"/"+this.feedNames[perfil.socialMedia]+"/unsubscribe",data,{withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async follow(perfil, feed){
        try{

            var data = {
                profile:perfil,
                feed:feed.name
            }

            var result = await axios.post("/"+perfil.socialMedia+"/"+this.feedNames[perfil.socialMedia]+"/subscribe",data,{withCredentials:true})

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async getFeedsFromUser(username, redSocial){
        try{
            var result = await axios.get("/"+redSocial+"/"+this.feedNames[redSocial]+"/all");

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async getFeedsFromQuery(query, redSocial){
        try{
            var result = await axios.get("/"+redSocial+"/"+this.feedNames[redSocial]+"/find?q="+query);

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

}export default FeedsRepository