import axios from "../../../dependencies/axiosInstance"
import {post} from "axios";

class PostsRepository{

    async post(postInfo,media, perfil){
        try{
            var data = new FormData();
            data.set("post", JSON.stringify(postInfo));
            data.set("media", media);
            data.set("profile",JSON.stringify(perfil));

            var result = await axios.post("/"+perfil.socialMedia+"/posts/upload",data,)
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
    async findInFeedBluesky (feed,searchTerm, profile){
        try{
            var result = await axios.get("/bluesky/"+feed+"/posts/?q="+searchTerm+"&selectedProfile="+(profile+""), {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

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

    async findPostsBluesky (searchTerm, profile){
        try{
            var perfil = profile+""
            var result = await axios.get("/bluesky/posts/search?q="+searchTerm+"&selectedProfile="+perfil, {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

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

    async findDefaultBluesky (profile){
        try{
            var result = await axios.get("/bluesky/feeds/default?selectedProfile="+(profile+""), {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

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

    async findInSubreddit (feed,searchTerm){
        try{
            var result = await axios.get("/reddit/"+feed+"/posts/?sorter=new&q="+searchTerm, {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            var posts = resultJSON.data;
            return posts;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async findPostsReddit (searchTerm){
        try{
            var result = await axios.get("/reddit/posts/search?q="+searchTerm, {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            var posts = resultJSON.data;
            return posts;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async getPostByIdReddit (post, profile){
        try{
            var result = await axios.get("/reddit/posts/info?post="+post.id+"&subreddit="+post.subreddit, {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            var posts = resultJSON.data;
            return posts;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async getPostByIdBluesky (post, profile){
        try{
            var result = await axios.get("/bluesky/posts/info?post="+post.uri+"&selectedProfile="+profile, {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            var posts = resultJSON.data;
            return posts;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async findDefaultReddit (){
        try{
            var result = await axios.get("/reddit/posts/", {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            var posts = resultJSON.data;
            return posts;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async findFromUserBluesky(profile, selectedProfile){
        try{
            var result = await axios.get("/bluesky/posts/search/user?q="+profile
                + "&=selectedProfile="+selectedProfile, {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

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
    async findFromUserReddit(profile){
        try{
            var result = await axios.get("/reddit/posts/search/user?q="+profile, {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            var posts = resultJSON.data;
            return posts;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async like(post, profile){
        try{
            var data ={
                originalPost:post.uri,
                profile:profile
            }

            var result = await axios.post("/bluesky/posts/like",data,{withCredentials:true})
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

    async repost(post, profile, postContent){
        try{
            var data ={
                originalPost:post.uri,
                postContent: postContent,
                profile:profile
            }

            var result = await axios.post("/bluesky/posts/repost",data,{withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }}

    async vote(post, profile, score){
        try{
            var data ={
                post:post,
                score: score,
                profile:profile
            }

            var result = await axios.post("/reddit/posts/vote",data,{withCredentials:true})
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


}
export default PostsRepository;