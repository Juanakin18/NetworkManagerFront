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
       return <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        NetworkManager
                    </Typography>
                    <Button color="inherit" onClick={()=>this.toggle("login")}>Login</Button>
                    <Button color="inherit" onClick={()=>this.toggle("signup")}>Registrarse</Button>
                    <Button color="inherit" onClick={()=>this.toggle("multiFeed")}>Multi feed</Button>
                    <Button color="inherit" onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</Button>
                    <Button color="inherit" onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</Button>
                    <Button color="inherit" onClick={()=>this.toggle("submitPost")}>Postear</Button>
                    <Button color="inherit" onClick={()=>this.toggle("addProfile")}>Añadir perfil</Button>


                </Toolbar>
            </AppBar>
        </Box>
    };
}

export default NavBarComponent;