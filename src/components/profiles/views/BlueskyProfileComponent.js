import React from "react";
import BlueskyUserView from "../../users/BlueskyUserView";
import {Box, Button, FormLabel, Input, Typography} from "@mui/material";

/**
 * Bluesky profile component
 */
class BlueskyProfileComponent extends BlueskyUserView{


    /**
     * Constructor
     * @param props Properties
     */
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
            <Button id={"deleteProfile"}sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.removeProfile.bind(this)}>Borrar perfil</Button>
            <Button align="left" sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
        </Box>
    }

    /**
     * Saves the password
     * @param e The event of the password field
     */
    savePassword(e){
        this.state.password = e.target.value;
    }
    /**
     * Refreshes the tokens
     */
    async  refreshTokens(){
        var profile = this.state.getUser().handle;
        var password = this.state.password;
        await this.state.profilesService.refreshTokensBluesky(profile, password);
    }
    /**
     * Handles the refresh form
     * @returns The refresh form
     */
    handleRefreshForm(){
        return <Box>
            <FormLabel sx={{display:"flex", flexDirection:"column"}}>
                Contraseña
                <Input id={"refreshTokensPasswordField"} type={"password"} onInput={this.savePassword.bind(this)}/>
            </FormLabel>

            {this.handleRefreshResult()}
            <Button id={"refreshTokens"} sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}}onClick={this.refreshTokens.bind(this)}>Refrescar tokens</Button>
        </Box>

    }
    /**
     * Removes the profile
     */
    async removeProfile(){
        var profile = this.state.profilesService.getDisplayedProfile().handle;
        var result = this.state.profilesService.removeProfile(profile, "bluesky");
        this.goBack();
    }
    /**
     * Handles the tokens refresh result
     * @returns The result
     */
    handleRefreshResult(){
        var hasRefreshed = this.state.profilesService.getHasRefreshed("bluesky");
        if(hasRefreshed){
            return <Typography>Se ha refrescado la sesión</Typography>
        }
    }



}
export default BlueskyProfileComponent;