import axios from "../../../dependencies/axiosInstance"

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
}
export default PostsRepository;