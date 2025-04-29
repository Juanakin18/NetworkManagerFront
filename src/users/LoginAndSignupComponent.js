import React,{useState, useEffect} from "react";
import Signup from "./signup";
import Login from "./login";
function LoginAndSignUpComponent(props){

    const [toggled,setToggled] = useState("login");

    const usersService = props.usersService;

    const components = {
        signup:<Signup usersService = {usersService}></Signup>,
        login:<Login usersService = {usersService} setLoggedInfo={props.setLoggedInfo} getUserID={props.getUserID}></Login>
    }


    function getToggled(){
        return components[toggled];
    }

    function desplegar(component){
        setToggled(component);
    }

    return <div>


        <div>
            <button onClick={()=>{desplegar("signup")}}>Registro</button>
            <button onClick={()=>{desplegar("login")}}>Iniciar sesión</button>
        </div>
        {getToggled()}

    </div>;
}

export default LoginAndSignUpComponent;