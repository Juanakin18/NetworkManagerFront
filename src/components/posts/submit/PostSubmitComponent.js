
import {Autocomplete, Box, Card, TextField} from "@mui/material";
import React, {createRef, useState} from "react";
import postsService from "../../../users/services/posts/PostsService";

function PostSubmitComponent(props){

    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [selectedProfiles, setSelectedProfiles]=useState([]);
    const [profiles, setProfiles]=useState(props.profilesService.getSelfProfiles());
    const [title, setTitle]=useState("");
    const [subreddit, setSubreddit]=useState("");
    const [content, setContent]=useState("");
    const [profilesService, setProfilesService]=useState(props.profilesService);
    const [usersService, setUsersService]=useState(props.usersService);
    const [postsService, setPostsService]= useState(props.postsService);
    const [alt, setAlt]=useState("Alt");
    const file = createRef();



    function guardarContent(e){
        var nombre = e.target.value;
        setContent(nombre);
    }


    function handleResult(){

        if(result == "SUCCESS"){
            console.log("Todo ha ido bien");
            return <p>Todo ha ido bien</p>
        }
        else if(result!="")
            return <h3>Ha habido un error</h3>
    }


    function handleErrorCodes(property){
        if(errors ==undefined)
            setErrors([])

        var errorsProperty = errors[property];
        if (errorsProperty == undefined){
            errors[property]=[];
            errorsProperty = errors[property];
        }
        if(errorsProperty==undefined)
            return <p></p>
        else {

            return <ul>
                {errorsProperty.map((error)=>{
                    return formatErrors(error);
                })}
            </ul>;
        }
    }

    function formatErrors(error){
        console.log(error)
        return <li><p>{error}</p></li>;
    }

    function handleSocialMedias(){
        var result = selectedProfiles.filter((profile)=>{
            return profile.socialMedia=="reddit"
        });

        if(result){
            return <div>
                {handleErrorCodes("title")}

                <label>
                    Título
                    <input type={"text"} onInput={guardarTitle}/>
                </label>

                {handleErrorCodes("subreddit")}

                <label>
                    Subreddit
                    <input type={"text"} onInput={guardarSubreddit}/>
                </label>

            </div>
        }
    }

    function guardarTitle(e){
        setTitle(e.target.value);
    }

    function  guardarSubreddit(e){
        setSubreddit(e.target.value)
    }

    async function submitPost(){
        var postData = {
            postContent:content,
            subreddit:subreddit,
            title:title,
            alt:alt
        }
        await postsService.postMultiple(postData, file.current.files[0],selectedProfiles);
    }

    /*
    async function submitPostImage(){
        var postData = {
            postContent:content,
            subreddit:subreddit,
            title:title,
            media:{
                image:imageRoute,
                imageFile:file,
                alt:alt
            }
        }
        await postsService.postMultiple(postData,selectedProfiles);
    }*/

     function printProfiles(){
        return profiles.map((profile)=>{
            return <div>
                <p>{profile.socialMedia}</p>
                <p>{profile.profile}</p>
                <input type={"checkbox"} onChange={()=>{
                    addProfileToList(profile);
                }
                }/>
            </div>
        })
    }

    function addProfileToList(profile){
        if(selectedProfiles.includes(profile))
            setSelectedProfiles(selectedProfiles.filter((a)=>a!=profile))
        else
            selectedProfiles.push(profile);
    }

    async function fetchList(){
        var list = await profilesService.getAllProfiles();
        if(list!=undefined)
            setProfiles(list);
    }

    function handleAlt(e){
        setAlt(e.target.value);
    }

    return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} >

                <h2>Postear</h2>
                <section>
                    <h3>Seleccione los perfiles a usar</h3>
                    <button onClick={fetchList}>Cargar perfiles</button>
                    {printProfiles()}
                </section>

                {handleSocialMedias()}
                {handleErrorCodes("content")}

                <label>
                    Contenido
                    <input type={"content"} onInput={guardarContent}/>
                </label>


                {handleResult()}
                <label>
                    Imagen Adjunta
                    <input type={"file"} name={"image"} ref={file}/>
                </label>

        <label>
            Texto alternativo
            <input type={"content"} onInput={handleAlt}/>
        </label>

                <button onClick={submitPost}>Añadir</button>
            </Card>);
}

export default PostSubmitComponent;