import React from "react";
import ProfileComponent from "./ProfileComponent";
import RedditUserView from "../../feeds/users/RedditUserView";
import {Box, Button} from "@mui/material";

class RedditProfileComponent extends RedditUserView{

    constructor(props) {
        super(props);
        this.goBack = props.goBack;
        this.getUserID = props.getUserID;
    }
    handleManagement(){
        return <Box sx={{display:"flex"}}>
            {this.handleRefreshForm()}
            <Button sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.removeProfile.bind(this)}>Borrar perfil</Button>
            <Button align="left" sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refresh.bind(this)}>Refrescar</Button>
        </Box>
    }



    async  refreshTokens(){
        var userID = this.getUserID;
        var profile = this.state.getUser();
        var query = "userID="+this.getUserID+"&profile="+profile.name;
        window.open("http://localhost:3000/reddit/login?"+query, "_blank");
    }

    handleRefreshForm(){
        return <Button sx={{marginLeft:"1em",backgroundColor:"accents.main", color:"accents.text"}} onClick={this.refreshTokens.bind(this)}>Refrescar tokens</Button>

    }

    async removeProfile(){
        var profile = this.state.profilesService.getDisplayedProfile().name;
        var result = await this.state.profilesService.removeProfile(profile, "reddit");
        this.goBack();
    }


}
export default RedditProfileComponent;