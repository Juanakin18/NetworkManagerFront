import React from "react";
import ProfileComponent from "./ProfileComponent";
import BlueskyUserView from "../../feeds/users/BlueskyUserView";
import {Box, Button, FormLabel, Input, Typography} from "@mui/material";

class BlueskyProfileComponent extends BlueskyUserView{


    constructor(props) {
        super(props);
        this.goBack = props.goBack;
        this.state.password = "";
        this.state.refreshed = false;
        this.setState(this.state);
    }
    handleManagement(){
        return <Box sx={{display:"flex"}}>
            {this.handleRefreshForm()}
            <Button sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.removeProfile.bind(this)}>Borrar perfil</Button>
            <Button align="left" sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
        </Box>
    }

    guardarPassword(e){
        this.state.password = e.target.value;
    }

    async  refreshTokens(){
        var profile = this.state.getUser().handle;
        var password = this.state.password;
        await this.state.profilesService.refreshTokensBluesky(profile, password);
    }

    handleRefreshForm(){
        return <Box>
            <FormLabel>
                Contraseña
            </FormLabel>
            <Input type={"password"} onInput={this.guardarPassword.bind(this)}/>
            {this.handleRefreshResult()}
            <Button  sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}}onClick={this.refreshTokens.bind(this)}>Refrescar tokens</Button>
        </Box>

    }

    async removeProfile(){
        var profile = this.state.profilesService.getDisplayedProfile().handle;
        var result = this.state.profilesService.removeProfile(profile, "bluesky");
        this.goBack();
    }
    handleRefreshResult(){
        var hasRefreshed = this.state.profilesService.getHasRefreshed("bluesky");
        if(hasRefreshed){
            return <Typography>Se ha refrescado la sesión</Typography>
        }
    }



}
export default BlueskyProfileComponent;