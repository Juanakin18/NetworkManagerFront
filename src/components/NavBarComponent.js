
import React from "react";

class NavBarComponent extends React.Component{


    constructor(props){
        super();
        this.state={
            toggle:props.toggle,
            toggleToFeed:props.toggleToFeed,
            usersService: props.usersService
        }
    }
    toggle(tag){
        this.state.toggle(tag);
    }

     toggleToFeed(tag){
        this.state.toggleToFeed(tag)
    }

    logOut(){
        this.state.usersService.logout();
    }

    getLoggedUser(){
        return this.state.usersService.loginInfo;
    }
    handleLoggedIn(){
        var user = this.getLoggedUser();
        if(user!=null){
            return <div>
                    <button color="inherit" onClick={()=>this.toggle("multiMainView")}>Multi feed</button>
                    <button color="inherit" onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</button>
                    <button color="inherit" onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</button>
                    <button color="inherit" onClick={()=>this.toggle("submitPost")}>Postear</button>
                    <button color="inherit" onClick={()=>this.toggle("addProfile")}>Añadir perfil</button>
                    <button onClick={()=>this.logOut()}>Cerrar sesión</button>
                </div>;
        }else{
            return <div>
                <button color="inherit" onClick={()=>this.toggle("login")}>Login</button>
                <button color="inherit" onClick={()=>this.toggle("signup")}>Registrarse</button>

            </div>;
        }
    }


    render(){
       return <nav>
           <h1>NetworkManager</h1>
           {this.handleLoggedIn()}
       </nav>
    };
}

export default NavBarComponent;