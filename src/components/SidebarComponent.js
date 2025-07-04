import React,{useState} from "react";
import {
    Box,
    Button, Card, Container,
    Drawer,
    Toolbar, Typography
} from "@mui/material";
import ProfileListComponent from "./profiles/ProfileListComponent";

/**
 * Sidebar component
 * @param props The properties
 * @returns The formatted sidebar component
 */
function SidebarComponent(props){
    const drawerWidth = "20vw";

    /**
     * The social media property
     */
    const [getSocialMedia, setGetSocialMedia] = useState(props.getSocialMedia)

    const [usersService, setUsersService] = useState(props.usersService);
    /**
     * Manages the rendering of the sidebar buttons
     * @returns The buttons
     */
    function renderAddButton(){
        const user = usersService.loginInfo;
        if(user!==undefined && user!==null){
            var userData = user.user;
            if(userData!==null && userData!==undefined &&userData!==""){
                return <Container>
                    <Button align={"center"} sx={{bgcolor:"accents.main", color:"accents.text", width:"100%"}} onClick={()=>props.toggle()}>Añadir perfil</Button>
                    <ProfileListComponent getSocialMedia={getSocialMedia} profilesList={props.profilesList} profilesService={props.profilesService} zoomUser={props.zoomUser}></ProfileListComponent>
                </Container>
            }
        }
        return <Container>
            <Button align={"center"} sx={{bgcolor:"accents.main", color:"accents.text", width:"100%"}} onClick={()=>props.toggleToLogin()}>Inicie sesión para administrar sus perfiles</Button>

        </Container>
    }

    return (
        <Drawer
            variant="permanent"

            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    paddingTop:"2em",
                    bgcolor:"sidebar.main"
                },

            }}
        >
            <Toolbar />
            {renderAddButton()}
        </Drawer>
       );
}

export default SidebarComponent;