import React from "react";



class ProfileComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            profilesService:props.profilesService,
            doYouFollowIt:false
        }
    }

    formatProfile(){
        return (<section>
            <h3>{this.state.profilesService.getZoomedProfile().loginInfo}</h3>
            {this.doFormatProfile()}
        </section>)
    }

    doFormatProfile(){
    }

    render(){
        return (this.formatProfile());
    }
}
export default ProfileComponent;