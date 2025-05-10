import axios from "../../dependencies/axiosInstance";

class FeedsRepository{


    async unfollow(perfil, redSocial, feedName, feed){
        try{

            var data = {
                profile:perfil,
                feed:feed.name
            }

            var result = await axios.post("/"+redSocial+"/"+feedName+"/unsubscribe",data,{withCredentials:true})
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

    async follow(perfil, redSocial, feed, feedName){
        try{

            var data = {
                profile:perfil,
                feed:feed.name
            }

            var result = await axios.post("/"+redSocial+"/"+feedName+"/subscribe",data,{withCredentials:true})

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

    async getFeedsFromUser(username, redSocial, feedName){
        try{
            var result = await axios.get("/"+redSocial+"/"+feedName+"/all");

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

    async getFeedsFromQuery(query, redSocial, profile, feedName){
        try{
            var queryText = "?q="+query;
            if(profile!=undefined&&profile!=""&&profile!=={})
                queryText+="&profile";
            var result = await axios.get("/"+redSocial+"/"+feedName+"/find"+queryText);

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON.data;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async fetchInfoFromFeed(redSocial,feed, profile, feedName){
        try{
            var queryText = "?q="+feed;
            if(profile!=undefined&&profile!=""&&profile!=={})
                queryText+="&profile";
            var result = await axios.get("/"+redSocial+"/"+feedName+"/info"+queryText);

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON.data;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

}export default FeedsRepository