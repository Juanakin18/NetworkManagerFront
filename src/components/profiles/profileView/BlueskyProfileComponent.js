import React from "react";
import ProfileComponent from "./ProfileComponent";

class BlueskyProfileComponent extends ProfileComponent{

    handleIfItsYours(){
        var isYours = this.state.profilesService.isItYours();
        if(!isYours){
            var doYouFollowIt = this.state.profilesService.doYouFollowIt();
            if(!doYouFollowIt){
                return <div>
                    <button onClick={this.follow}>Seguir</button>
                </div>
            }else{
                return <div>
                    <button onClick={this.unfollow}>Dejar de seguir</button>
                </div>
            }
        }
    }

    async follow(){
        var result = await this.state.profilesService.follow();
        this.state.doYouFollowIt = true;
    }

    async unfollow(){
        var result = await this.state.profilesService.unfollow();
        this.state.doYouFollowIt = false;
    }

    handleFollowSection(){
        if(this.state.profilesService.getSelectedProfile())
            return this.handleIfItsYours();
        else{
            return <p>Seleccione un perfil de bluesky para iniciar sesión</p>
        }
    }
    doFormatProfile(){
        return <div>
            {this.handleFollowSection()}
            {this.handleIfItsYours()}
            <section>
                <h3>Contenido del perfil</h3>
            </section>
        </div>
    }


}
export default RedditProfileComponent;