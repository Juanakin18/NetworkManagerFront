
import {Autocomplete, Box, Card, TextField} from "@mui/material";
import {useState} from "react";

function PostSubmitComponent(props){

    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [socialMedia, setSocialMedia]=useState({});
    const [content, setContent]=useState("");

    const redesSociales =[
        {label:"Reddit",id:1},
        {label:"Bluesky",id:2},
    ]

    //const profilesService = props.profilesService;

    function guardarContent(e){
        var nombre = e.target.value;
        setContent(nombre);
    }

    function updateSocialMedia(e){
        var media = e;
        setSocialMedia(media);
    }

    function handleResult(){

        if(result == "SUCCESS"){
            console.log("Todo ha ido bien");
            return <p>Todo ha ido bien</p>
        }
        else if(result!="")
            return <h3>Ha habido un error</h3>
    }

    async function addSocialMedia(){

        //TODO Llamar a la API
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

    return (<div>

        <Box  component="section"
              sx={{ display: 'inline-block', mx: '1em', transform: 'scale(1)' }}>
            <Card>
                <h2>Postear</h2>
                <label>
                    Red Social
                    <Autocomplete
                        options={redesSociales}
                        onInputChange={(event,newInputValue)=>updateSocialMedia(newInputValue)}
                        renderInput={(params)=><TextField{...params}/>} />
                </label>
                {handleErrorCodes("socialMedia")}



                {handleErrorCodes("content")}

                <label>
                    Contenido
                    <input type={"content"} onInput={guardarContent}/>
                </label>


                {handleResult()}

                <button onClick={addSocialMedia}>Añadir</button>
            </Card>
        </Box>

    </div>);
}

export default PostSubmitComponent;