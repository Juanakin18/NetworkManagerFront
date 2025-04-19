import React,{useState, useEffect} from "react";
function TwoFactor(props){

    const [numero,setNumero] = useState("");
    const [errors, setErrors] = useState([]);
    const [result, setResult] = useState("");
    const [token, setToken] = useState("");

    const usersService = props.usersService;

    function getLoginInput(){
        return props.getLoginInput();
    }

    function guardarNumero(e){
        setNumero(e.target.value);
    }

    async function checkTFA(){
        var result = await usersService.checkTFA(getLoginInput(),numero);
        console.log("El resultado ha sido:")
        console.log(result)
        setResult(result.result);
        if(result.result == "ERROR"){
            console.log(result.errors);
            setErrors(result.errors);
        }else{
            setToken(result.token);
        }
    }

    function handleResult(){
        if(result == "SUCCESS")
            return <h3>Ha iniciado sesión correctamente con el token {token}</h3>
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

    return (<div>

        <h2>Autenticación de doble factor</h2>
        <section className={"signup"}>


            {handleResult()}


            {handleErrorCodes("number")}

            <label>
                Introduzca el número de inicio de sesión
                <input type={"number"} onInput={guardarNumero}/>
            </label>



            <button onClick={checkTFA}>Comprobar doble factor</button>
        </section>
    </div>);
}

export default TwoFactor;