import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Toolbar, Typography
} from "@mui/material";
import React from "react";

class NavBarComponent extends React.Component{


    constructor(props){
        super();
        this.state={
            toggle:props.toggle,
            toggleToFeed:props.toggleToFeed
        }
    }
    toggle(tag){
        this.state.toggle(tag);
    }

     toggleToFeed(tag){
        this.state.toggleToFeed(tag)
    }

    render(){
       return <nav>
           <h1>NetworkManager</h1>
           <button color="inherit" onClick={()=>this.toggle("login")}>Login</button>
           <button color="inherit" onClick={()=>this.toggle("signup")}>Registrarse</button>
           <button color="inherit" onClick={()=>this.toggle("multiFeed")}>Multi feed</button>
           <button color="inherit" onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</button>
           <button color="inherit" onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</button>
           <button color="inherit" onClick={()=>this.toggle("submitPost")}>Postear</button>
           <button color="inherit" onClick={()=>this.toggle("addProfile")}>Añadir perfil</button>
       </nav>
    };
}

export default NavBarComponent;