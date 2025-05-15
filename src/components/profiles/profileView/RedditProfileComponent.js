import React from "react";
import ProfileComponent from "./ProfileComponent";
import RedditUserView from "../../feeds/users/RedditUserView";

class RedditProfileComponent extends RedditUserView{

    constructor(props) {
        super(props);
        this.goBack = props.goBack;
        this.getUserID = props.getUserID;
    }
    handleManagement(){
        return <div>
            {this.handleRefreshForm()}
            <button onClick={this.removeProfile.bind(this)}>Borrar perfil</button>
        </div>
    }



    async  refresh(){
        var userID = this.getUserID;
        var profile = this.state.getUser();
        var query = "userID="+this.getUserID+"&profile="+profile.name;
        window.open("http://localhost:3000/reddit/login?"+query, "_blank");
    }

    handleRefreshForm(){
        return  <div>
            <button onClick={this.refresh.bind(this)}>Refrescar tokens</button>
        </div>

    }

    async removeProfile(){
        var profile = this.state.profilesService.getDisplayedProfile().name;
        var result = await this.state.profilesService.removeProfile(profile, "reddit");
        this.goBack();
    }


}
export default RedditProfileComponent;