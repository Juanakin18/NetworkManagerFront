import axios from "../../../dependencies/axiosInstance"
import {post} from "axios";

class PostsRepository{

    async post(postInfo, perfil){
        try{
            var result = await axios.post("/"+perfil.socialMedia+"/posts/upload",{
                post:postInfo,
                profile:perfil
            })
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

    async findPostsBluesky (searchTerm){
        try{
            var result = await axios.get("/bluesky/posts/search?q="+searchTerm, {withCredentials:true})
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
}
export default PostsRepository;