
import React from "react";
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography, Menu, MenuList, MenuItem} from "@mui/material";
import {MenuButton} from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu"

class NavBarComponent extends React.Component{


    constructor(props){
        super();
        this.state={
            toggle:props.toggle,
            toggleToFeed:props.toggleToFeed,
            usersService: props.usersService,
            logout:props.logout,
            getToggle:props.getToggle,
            toggledTab:"login",
            anchorNav:null
        }
    }

    openMenu(event){
        this.state.anchorNav=(event.currentTarget);
        this.setState(this.state);
    }

    closeMenu(){
        this.state.anchorNav=null;
        this.setState(this.state);
    }
    toggle(tag){
        this.state.toggle(tag);
        this.state.toggledTab=tag;
        this.setState(this.state);
    }

     toggleToFeed(tag){
        this.state.toggleToFeed(tag)
         this.state.toggledTab=tag;
         this.setState(this.state);
    }

    logOut(){
        this.state.logout();
        this.state.toggledTab="login";
        this.setState(this.state);
    }

    getLoggedUser(){
        return this.state.usersService.loginInfo;
    }
    handleLoggedIn(){
        var user = this.getLoggedUser();
        if(user==null){
            return <Toolbar sx={{display:"flex", flexdirection:"row", justifyContent: 'flex-end', paddingTop:"1em"}} p={1} align={"right"}>
                <Button color="inherit" sx={this.getColor("multiMainView")}onClick={()=>this.toggle("multiMainView")}>Multi feed</Button>
                <Button color="inherit"  sx={this.getColor("redditMainView")} onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</Button>
                <Button color="inherit" sx={this.getColor("blueskyMainView")} onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</Button>
                <Button color="inherit"  sx={this.getColor("login")} onClick={()=>this.toggle("login")}>Login</Button>
                <Button color="inherit"  sx={this.getColor("signup")}onClick={()=>this.toggle("signup")}>Registrarse</Button>

            </Toolbar>;
        }
        var userInfo = user.user;
        if(userInfo!=undefined){
            return <Toolbar sx={{display:"flex", flexdirection:"row", justifyContent: 'flex-end' }} p={1} align={"right"}>
                <Button color="inherit" sx={this.getColor("multiMainView")}onClick={()=>this.toggle("multiMainView")}>Multi feed</Button>
                <Button color="inherit"  sx={this.getColor("redditMainView")} onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</Button>
                <Button color="inherit" sx={this.getColor("blueskyMainView")} onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</Button>
                    <Button color="inherit"  sx={this.getColor("submitPost")} onClick={()=>this.toggle("submitPost")}>Postear</Button>
                    <Button color="inherit"  sx={this.getColor("addProfile")} onClick={()=>this.toggle("addProfile")}>Añadir perfil</Button>
                    <Button color="inherit"  onClick={()=>this.logOut()}>Cerrar sesión</Button>
                </Toolbar>;
        }else{
            return <Toolbar sx={{display:"flex", flexdirection:"row", justifyContent: 'flex-end', paddingTop:"1em"}} p={1} align={"right"}>
                <Button color="inherit" sx={this.getColor("multiMainView")}onClick={()=>this.toggle("multiMainView")}>Multi feed</Button>
                <Button color="inherit"  sx={this.getColor("redditMainView")} onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</Button>
                <Button color="inherit" sx={this.getColor("blueskyMainView")} onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</Button>
                <Button color="inherit"  sx={this.getColor("login")} onClick={()=>this.toggle("login")}>Login</Button>
                <Button color="inherit"  sx={this.getColor("signup")}onClick={()=>this.toggle("signup")}>Registrarse</Button>

            </Toolbar>;
        }
    }

    handleLoggedMenu(){
        var user = this.getLoggedUser();
        if(user==null){
            return [<MenuItem  onClick={()=>this.toggle("multiMainView")}>Multi feed</MenuItem>,
                <MenuItem  onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</MenuItem>,
                <MenuItem   onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</MenuItem>,
                <MenuItem onClick={()=>this.toggle("login")}>Login</MenuItem>,
                <MenuItem onClick={()=>this.toggle("signup")}>Registrarse</MenuItem>]


        }
        var userInfo = user.user;
        if(userInfo!=undefined){
            return [<MenuItem onClick={()=>this.toggle("multiMainView")}>Multi feed</MenuItem>,
                <MenuItem  onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</MenuItem>,
                <MenuItem onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</MenuItem>,
                <MenuItem onClick={()=>this.toggle("submitPost")}>Postear</MenuItem>,
                <MenuItem onClick={()=>this.toggle("addProfile")}>Añadir perfil</MenuItem>,
                <MenuItem  onClick={()=>this.logOut()}>Cerrar sesión</MenuItem>]
        }else{
            return[<MenuItem  onClick={()=>this.toggle("multiMainView")}>Multi feed</MenuItem>,
                <MenuItem  onClick={()=>this.toggleToFeed("reddit")}>Feed reddit</MenuItem>,
                <MenuItem   onClick={()=>this.toggleToFeed("bluesky")}>Feed Bluesky</MenuItem>,
                <MenuItem onClick={()=>this.toggle("login")}>Login</MenuItem>,
                <MenuItem onClick={()=>this.toggle("signup")}>Registrarse</MenuItem>]
        }
    }
    drawerWidth = 240

    getColor(tab){
        var color = {backgroundColor:"accents.main", color:"accents.text"};
        var toggle = this.state.getToggle();
        if(tab!=toggle){
            color={backgroundColor:"secondary.main", color:"secondary.text"}
        }
        return color;
    }

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

    toggleMenu(){
        this.state.bbOpen=true;
        this.setState(this.state);
    }

    handleBurgerButton(){
        if(this.state.bbOpen){
            return this.handleLoggedIn();
        }
    }
    render(){

       return <AppBar position="fixed" sx={{
           zIndex: (theme) => theme.zIndex.drawer + 1 ,
           color:"navbar.text",
           bgcolor:"navbar.main",
           display:"flex",
           flexDirection:"row",
           paddingBottom:"1em"
       }}>
           <Box sx={{display:{xs:"flex", md:"none"}}}>
               <IconButton title={"menuButton"}aria-controls="simple-menu" aria-haspopup="true"size="large" edge="start" onClick={this.openMenu.bind(this)}sx={{ marginTop:"0.5em", marginLeft:"0.5em"}}>
                   <MenuIcon></MenuIcon>
               </IconButton>
               <Typography sx={{marginTop:"0.25em",paddingTop:"0.2em", paddingLeft:"0.5em"}} variant={"h4"}component={"h1"}align={"center"}>NetworkManager</Typography>
               <Menu getContentAnchorEl={null}
                     anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                     transformOrigin={{vertical: 'top', horizontal: 'right'}}
                     onClose={this.closeMenu.bind(this)}
                     sx={{display:{xs:"flex", md:"none"}, marginTop:"3em",flexDirection:"column"}}
                     open={(Boolean(this.state.anchorNav))}

               >
                   <MenuList sx={{display:"flex",flexDirection:"column"}}>
                       {this.handleLoggedMenu()}
                   </MenuList>
               </Menu>
           </Box>

           <Toolbar sx={{display:{xs:"none", md:"flex"}}}>
               <Typography sx={{paddingTop:"0.2em", paddingLeft:"0.5em"}} variant={"h4"}component={"h1"}align={"center"}>NetworkManager</Typography>
               {this.handleLoggedIn()}
           </Toolbar>
       </AppBar>;
    };
}

export default NavBarComponent;