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
    async findInFeedBluesky (feed,searchTerm){
        try{
            var result = await axios.get("/bluesky/"+feed+"/posts/?q="+searchTerm, {withCredentials:true})
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

    async findPostsBluesky (searchTerm, profile){
        try{
            var perfil = profile+""
            var result = await axios.get("/bluesky/posts/search?q="+searchTerm+"&user="+perfil, {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data.data.posts;
            console.log(resultJSON)
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async findDefaultBluesky (){
        try{
            var result = await axios.get("/bluesky/feed/default", {withCredentials:true})
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

    async findInSubreddit (feed,searchTerm){
        try{
            var result = await axios.get("/reddit/"+feed+"/posts/?sorter=new&q="+searchTerm, {withCredentials:true})
            //var result = await fetch("http://localhost:3000/signup", requestOptions)

            console.log("Respuesta recibida")

            var resultJSON = await result.data;
            console.log(resultJSON)
            var posts = resultJSON.data.children.map((post)=>{
                return post.data;
            })
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
            return resultJSON;
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
            return resultJSON;
        }catch (e) {
            console.log(e)
            console.error(e.response.data.errors);
            return e.response.data.errors;
        }
    }

    async findFromUserBluesky(profile){
        try{
            var result = await axios.get("/bluesky/posts/search/user?q="+profile.nombrePerfil, {withCredentials:true})
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
    async findFromUserReddit(profile){
        try{
            var result = await axios.get("/reddit/posts/search/user?q="+profile.nombrePerfil, {withCredentials:true})
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
                originalPost:post.id,
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