
import React from "react";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";

class NavBarComponent extends React.Component{


    constructor(props){
        super();
        this.state={
            toggle:props.toggle,
            toggleToFeed:props.toggleToFeed,
            usersService: props.usersService,
            logout:props.logout
        }
    }
    toggle(tag){
        this.state.toggle(tag);
    }

     toggleToFeed(tag){
        this.state.toggleToFeed(tag)
    }

    logOut(){
        this.state.logout();
    }

    getLoggedUser(){
        return this.state.usersService.loginInfo;
    }
    handleLoggedIn(){
        var user = this.getLoggedUser();
        if(user!=null){
            return <Toolbar sx={{display:"flex", flexdirection:"row", justifyContent: 'flex-end' }} p={1} align={"right"}>
                    <Button color="inherit" onClick={()=>this.toggle("multiMainView")}>Multi feed</Button>
                    <Button color="inherit" onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</Button>
                    <Button color="inherit" onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</Button>
                    <Button color="inherit" onClick={()=>this.toggle("submitPost")}>Postear</Button>
                    <Button color="inherit" onClick={()=>this.toggle("addProfile")}>Añadir perfil</Button>
                    <Button color="inherit" onClick={()=>this.logOut()}>Cerrar sesión</Button>
                </Toolbar>;
        }else{
            return <Toolbar sx={{display:"flex", flexdirection:"row", justifyContent: 'flex-end', paddingTop:"1em"}} p={1} align={"right"}>
                <Button color="inherit" onClick={()=>this.toggle("multiMainView")}>Multi feed</Button>
                <Button color="inherit" onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</Button>
                <Button color="inherit" onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</Button>
                <Button color="inherit" onClick={()=>this.toggle("login")}>Login</Button>
                <Button color="inherit" onClick={()=>this.toggle("signup")}>Registrarse</Button>

            </Toolbar>;
        }
    }
    drawerWidth = 240


    /*
     b = <AppBar sx={{bgcolor:"navbar.main",
        color:"navbar.text",
        display:"flex",
        flexDirection:"row",
        padding:"1em"}}
                    position={"fixed"} p={2}>
        <Typography sx={{paddingTop:"0.2em", paddingLeft:"0.5em"}} variant={"h4"}component={"h1"}align={"center"}>NetworkManager</Typography>

        {this.handleLoggedIn()}
    </AppBar>
*/
    render(){

       return <AppBar position="fixed" sx={{
           zIndex: (theme) => theme.zIndex.drawer + 1 ,
           color:"navbar.text",
           bgcolor:"navbar.main",
           display:"flex",
           flexDirection:"row",
           paddingBottom:"1em"
       }}>
           <Toolbar>
               <Typography sx={{paddingTop:"0.2em", paddingLeft:"0.5em"}} variant={"h4"}component={"h1"}align={"center"}>NetworkManager</Typography>
               {this.handleLoggedIn()}
           </Toolbar>
       </AppBar>;
    };
}

export default NavBarComponent;