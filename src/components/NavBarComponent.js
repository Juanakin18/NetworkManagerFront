
import React from "react";
import {AppBar, Box, Button, IconButton, Toolbar, Typography, Menu, MenuList, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"

/**
 * Nav bar component
 */
class NavBarComponent extends React.Component{


    /**
     * Constructor function
     * @param props The properties
     */
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

    /**
     * Opens the menu
     * @param event The menu opening event
     */
    openMenu(event){
        this.state.anchorNav=(event.currentTarget);
        this.setState(this.state);
    }

    /**
     * Closes the menu
     */
    closeMenu(){
        this.state.anchorNav=null;
        this.setState(this.state);
    }

    /**
     * Opens one of the tabs
     * @param tag The tab that is going to be open
     */
    toggle(tag){
        this.state.toggle(tag);
        this.state.toggledTab=tag;
        this.setState(this.state);
    }

    /**
     * Opens the one of the feeds
     * @param tag The feed
     */
     toggleToFeed(tag){
        this.state.toggleToFeed(tag)
         this.state.toggledTab=tag;
         this.setState(this.state);
    }

    /**
     * Logs out
     */
    logOut(){
        this.state.logout();
        this.state.toggledTab="login";
        this.setState(this.state);
    }

    /**
     * Returns the currently logged user
     * @returns The logged user
     */
    getLoggedUser(){
        return this.state.usersService.loginInfo;
    }

    /**
     * Returns the formatted nav bar
     * @returns The formatted nav bar
     */
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
    /**
     * Returns the formatted menu
     * @returns The formatted menu
     */
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

    /**
     * Returns the color for a button
     * @param tab The button
     * @returns The color of a button
     */
    getColor(tab){
        var color = {backgroundColor:"accents.main", color:"accents.text"};
        var toggle = this.state.getToggle();
        if(tab!=toggle){
            color={backgroundColor:"secondary.main", color:"secondary.text"}
        }
        return color;
    }

    /**
     * Opens a tab from the menu
     */
    toggleMenu(){
        this.state.bbOpen=true;
        this.setState(this.state);
    }

    /**
     * Handles the burger button
     * @returns The burger button
     */
    handleBurgerButton(){
        if(this.state.bbOpen){
            return this.handleLoggedIn();
        }
    }

    /**
     * Renders the component
     * @returns The component
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