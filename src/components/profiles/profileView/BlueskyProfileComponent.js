import React from "react";
import ProfileComponent from "./ProfileComponent";
import BlueskyUserView from "../../feeds/users/BlueskyUserView";

class BlueskyProfileComponent extends BlueskyUserView{


    constructor(props) {
        super(props);
        this.goBack = props.goBack;
        this.state.password = "";
        this.setState(this.state);
    }
    handleManagement(){
        return <div>
            {this.handleRefreshForm()}
            <button onClick={this.removeProfile.bind(this)}>Borrar perfil</button>
        </div>
    }

    guardarPassword(e){
        this.state.password = e.target.value;
    }

    async  refresh(){

        var profile = this.state.getUser().handle;
        var password = this.state.password;

        var result = await this.state.profilesService.loginBluesky(profile, password);
    }

    handleRefreshForm(){
        return <div>
            <label>
                Contraseña
                <input type={"password"} onInput={this.guardarPassword.bind(this)}/>
            </label>
            <button onClick={this.refresh.bind(this)}>Añadir</button>
        </div>

    }

    async removeProfile(){
        var profile = this.state.profilesService.getDisplayedProfile().handle;
        var result = this.state.profilesService.removeProfile(profile, "bluesky");
        this.goBack();
    }



}
export default BlueskyProfileComponent;