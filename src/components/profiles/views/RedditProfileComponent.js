import React from "react";
import RedditUserView from "../../users/RedditUserView";
import {Box, Button, Typography} from "@mui/material";

/**
 * Reddit profile component
 */
class RedditProfileComponent extends RedditUserView{

    /**
     * Constructor
     * @param props Properties
     */
    constructor(props) {
        super(props);
        this.goBack = props.goBack;
        this.getUserID = props.getUserID;
        this.state.refreshedTokens = props.externalData;
    }
    handleManagement(){
        return <Box sx={{display:"flex"}}>
            {this.handleRefreshForm()}
            <Button  id={"deleteProfile"} sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.removeProfile.bind(this)}>Borrar perfil</Button>
            <Button  align="left" sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
        </Box>
    }


    /**
     * Opens the refresh tokens form
     */
    async  refreshTokens(){
        var userID = this.getUserID;
        var profile = this.state.getUser();
        var query = "userID="+this.getUserID+"&profile="+profile.name;
        window.open("http://localhost:3000/reddit/login?"+query, "_blank");
    }

    /**
     * Handles the refresh form
     * @returns The refresh form
     */
    handleRefreshForm(){
        return [<Button  id={"refreshTokens"} sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refreshTokens.bind(this)}>Refrescar tokens</Button>
                , this.handleRefreshResult()]

    }

    /**
     * Removes the profile
     */
    async removeProfile(){
        var profile = this.state.profilesService.getDisplayedProfile().name;
        var result = await this.state.profilesService.removeProfile(profile, "reddit");
        this.goBack();
    }

    /**
     * Handles the tokens refresh result
     * @returns The result
     */
    handleRefreshResult(){
        var hasRefreshed = this.state.refreshedTokens();
        if(hasRefreshed){
            return <Typography>Se ha refrescado la sesión</Typography>
        }
    }


}
export default RedditProfileComponent;