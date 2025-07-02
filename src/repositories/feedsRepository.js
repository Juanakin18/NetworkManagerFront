import axios from "../dependencies/axiosInstance";

/**
 * Feeds repository
 */
class FeedsRepository{


    /**
     * Unsubscribes from a feed
     * @param profile The selected profile
     * @param socialMedia The Social network
     * @param feed The feed
     * @param feedName The feed name
     * @returns The result
     */
    async unfollow(profile, socialMedia, feed, feedName){
        try{

            var data = {
                profile:profile,
                feed:feed.display_name
            }

            var result = await axios.post("/"+socialMedia+"/"+feedName+"/leave",data,{withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

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
     * Subscribes to a feed
     * @param profile The selected profile
     * @param socialMedia The social network
     * @param feed The feed
     * @param feedName The feed name
     * @returns The result
     */
    async follow(profile, socialMedia, feed, feedName){
        try{

            var data = {
                profile:profile,
                feed:feed.display_name
            }

            var result = await axios.post("/"+socialMedia+"/"+feedName+"/subscribe",data,{withCredentials:true})
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
     * Gets all the feeds from a user
     * @param username The user
     * @param socialMedia The social network
     * @param feedName The feed name
     * @returns The feeds list
     */
    async getFeedsFromUser(username, socialMedia, feedName){
        try{
            var result = await axios.get("/"+socialMedia+"/"+feedName+"/all");
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
     * Gets all the feeds by a query
     * @param query The query
     * @param socialMedia The social media
     * @param profile The profile
     * @param feedName The feed name
     * @returns The list
     */
    async getFeedsFromQuery(query, socialMedia, profile, feedName){
        try{
            var queryText = "?q="+query;
            if(profile!=undefined&&profile!=""&&profile!=={})
                queryText+="&profile";
            var result = await axios.get("/"+socialMedia+"/"+feedName+"/find"+queryText);
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
     * Gets the information from a feed
     * @param socialMedia The social network
     * @param feed The feed
     * @param profile The profile
     * @param feedName The feed name
     * @returns The information
     */
    async fetchInfoFromFeed(socialMedia,feed, profile, feedName){
        try{
            var queryText = "?q="+feed;
            if(profile!=undefined&&profile!=""&&profile!=={})
                queryText+="&selectedProfile="+profile;
            var result = await axios.get("/"+socialMedia+"/"+feedName+"/info"+queryText);
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

}export default FeedsRepository