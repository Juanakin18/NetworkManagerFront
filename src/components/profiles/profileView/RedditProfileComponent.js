import React from "react";
import ProfileComponent from "./ProfileComponent";

class RedditProfileComponent extends ProfileComponent{

    doFormatProfile(){
        return <div>
            <section>
                <h3>Contenido del perfil</h3>
            </section>
        </div>
    }


}
export default RedditProfileComponent;