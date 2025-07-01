import axios from "../dependencies/axiosInstance"

/**
 * Posts repository
 */
class PostsRepository{

    /**
     * Uploads a post
     * @param postInfo The post
     * @param media The media
     * @param profile The profile
     * @returns The result
     */
    async post(postInfo,media, profile){
        try{
            var data = new FormData();
            data.set("post", JSON.stringify(postInfo));
            data.set("media", media);
            data.set("profile",JSON.stringify(profile));

            var result = await axios.post("/"+profile.socialMedia+"/posts/upload",data,)
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            var errors = e.response;
            if(errors==undefined)
                errors = e.stack;
            else
                errors=errors.data.errors;
            return {errors:
                    {
                        general:[errors]
                    }};
        }
    }
    /**
     * Finds posts in a bluesky feed
     * @param feed The subreddit
     * @param profile The profile
     * @returns The list
     */
    async findInFeedBluesky (feed, profile){
        try{
            var result = await axios.get("/bluesky/"+feed+"/posts/?selectedProfile="+(profile+""), {withCredentials:true})
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
     * Finds posts by text on reddit
     * @param searchTerm The text
     * @param profile The selected profile
     * @returns The list of posts
     */
    async findPostsBluesky (searchTerm, profile){
        try{
            var perfil = profile+""
            var result = await axios.get("/bluesky/posts/search?q="+searchTerm+"&selectedProfile="+perfil, {withCredentials:true})
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
     * Gets the default posts on bluesky
     * @param profile The selected profile
     * @returns The default posts
     */
    async findDefaultBluesky (profile){
        try{
            var result = await axios.get("/bluesky/feeds/default?selectedProfile="+(profile+""), {withCredentials:true})
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
     * Finds posts by text on a subreddit
     * @param feed The subreddit
     * @param searchTerm The text
     * @returns The list
     */
    async findInSubreddit (feed,searchTerm){
        try{
            var result = await axios.get("/reddit/"+feed+"/posts/?sorter=new&q="+searchTerm, {withCredentials:true})
            var resultJSON = await result.data;
            var posts = resultJSON.data;
            return posts;
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
     * Finds posts by text on reddit
     * @param searchTerm The text
     * @returns The list of posts
     */
    async findPostsReddit (searchTerm){
        try{
            var result = await axios.get("/reddit/posts/search?q="+searchTerm, {withCredentials:true})
            var resultJSON = await result.data;
            var posts = resultJSON.data;
            return posts;
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
     * Gets a post by id on reddit
     * @param post The post id
     * @param profile The profile
     * @returns The post
     */
    async getPostByIdReddit (post, profile){
        try{
            var result = await axios.get("/reddit/posts/info?post="+post.id+"&subreddit="+post.subreddit+"&selectedProfile="+profile, {withCredentials:true})
            var resultJSON = await result.data;
            var posts = resultJSON.data;
            return posts;
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
     * Gets a post by id on bluesky
     * @param post The post id
     * @param profile The profile
     * @returns The post
     */
    async getPostByIdBluesky (post, profile){
        try{
            var result = await axios.get("/bluesky/posts/info?post="+post.uri+"&selectedProfile="+profile, {withCredentials:true})
            var resultJSON = await result.data;
            var posts = resultJSON.data;
            return posts;
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
     * Gets the default posts on reddit
     * @returns The default posts
     */
    async findDefaultReddit (){
        try{
            var result = await axios.get("/reddit/posts/", {withCredentials:true})
            var resultJSON = await result.data;
            var posts = resultJSON.data;
            return posts;
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
     * Gets all the posts from a user on bluesky
     * @param profile The user
     * @param selectedProfile The selected profile
     * @returns The posts
     */
    async findFromUserBluesky(profile, selectedProfile){
        try{
            var result = await axios.get("/bluesky/posts/search/user?q="+profile
                + "&=selectedProfile="+selectedProfile, {withCredentials:true})
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
     * Gets all the posts from a user on reddit
     * @param profile The user
     * @returns The posts
     */
    async findFromUserReddit(profile){
        try{
            var result = await axios.get("/reddit/posts/search/user?q="+profile, {withCredentials:true})
            var resultJSON = await result.data;
            var posts = resultJSON.data;
            return posts;
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
     * Likes a post
     * @param post The post
     * @param profile The profile
     * @returns The result
     */
    async like(post, profile){
        try{
            var data ={
                originalPost:post.uri,
                profile:profile
            }

            var result = await axios.post("/bluesky/posts/like",data,{withCredentials:true})
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
     * Unlikes a post
     * @param post The post
     * @param profile The profile
     * @returns The result
     */
    async unlike(post, profile){
        try{
            var data ={
                originalPost:post.uri,
                profile:profile
            }

            var result = await axios.post("/bluesky/posts/unlike",data,{withCredentials:true})
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
     * Reposts a post
     * @param post The post
     * @param profile The profile
     * @param postContent The repost content
     * @returns The result
     */
    async repost(post, profile, postContent){
        try{
            var data ={
                originalPost:post.uri,
                postContent: postContent,
                profile:profile
            }

            var result = await axios.post("/bluesky/posts/repost",data,{withCredentials:true})
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
        }}

    /**
     * Votes a post
     * @param post The post
     * @param profile The profile
     * @param score The score
     * @returns The result
     */
    async vote(post, profile, score){
        try{
            var data ={
                post:post,
                score: score,
                profile:profile
            }

            var result = await axios.post("/reddit/posts/vote",data,{withCredentials:true})
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }

    }

    /**
     * Replies to a post
     * @param post The post
     * @param profile The profile
     * @param postContent The content of the reply
     * @param socialMedia The social network
     * @returns The result
     */
    async reply(post, profile, postContent, socialMedia){
        try{
            var data ={
                originalPost:post,
                replyContent: postContent,
                profile:profile
            }

            var result = await axios.post("/"+socialMedia+"/posts/reply",data,{withCredentials:true});
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }}

    /**
     * Votes a comment
     * @param score The score
     * @param profile The profile
     * @param comment The comment
     * @param socialMedia The social network
     * @returns The result
     */
    async voteComment(score, profile, comment, socialMedia){
        try{
            var data ={
                score:score,
                comment: comment,
                profile:profile
            }

            var result = await axios.post("/"+socialMedia+"/comments/vote",data,{withCredentials:true})
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }}

    /**
     * Replies to a comment
     * @param reply The reply
     * @param profile The profile
     * @param comment The comment
     * @param socialMedia The social network
     * @returns The result 
     */
    async replyToComment(reply, profile, comment, socialMedia){
        try{
            var data ={
                reply:reply,
                comment: comment,
                profile:profile
            }

            var result = await axios.post("/"+socialMedia+"/comments/reply",data,{withCredentials:true})
            var resultJSON = await result.data;
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }}


}
export default PostsRepository;