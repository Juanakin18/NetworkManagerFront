import {useState} from "react";

function ShareComponent(props){

    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [selectedProfiles, setSelectedProfiles]=useState([]);
    const [profiles, setProfiles]=useState(props.profilesService.getSelfProfiles());
    const [title, setTitle]=useState("");
    const [subreddit, setSubreddit]=useState("");
    const [content, setContent]=useState("");
    const [profilesService, setProfilesService]=useState(props.profilesService);
    const [postsService, setPostsService]= useState(props.postsService);
    const [getPost, setGetPost]=useState(props.getPost);
    const [socialMedia, setSocialMedia]=useState(props.socialMedia)


    function saveContent(e){
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
                    <input type={"text"} onInput={saveTitle}/>
                </label>

                {handleErrorCodes("subreddit")}

                <label>
                    Subreddit
                    <input type={"text"} onInput={saveSubreddit}/>
                </label>

            </div>
        }
    }

    function saveTitle(e){
        setTitle(e.target.value);
    }

    function  saveSubreddit(e){
        setSubreddit(e.target.value)
    }

    async function sharePost(){
        var post = getPost;
        var postData = {
            postToShare:post,
            postContent:content,
            subreddit:subreddit,
            title:title,
            socialMedia:socialMedia
        }
        var selected = selectedProfiles;
        await postsService.shareMultiple(postData,selected);
    }



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

    return (<section>

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
            <input type={"content"} onInput={saveContent}/>
        </label>


        {handleResult()}

        <button onClick={sharePost}>Añadir</button>
    </section>);
}

export default ShareComponent;