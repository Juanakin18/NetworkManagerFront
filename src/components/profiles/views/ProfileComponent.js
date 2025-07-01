import React from "react";

/**
 * Profile component
 */
class ProfileComponent extends React.Component{

    /**
     * Constructor
     * @param props The properties
     */
    constructor(props) {
        super();
        this.state = {
            profilesService:props.profilesService,
            doYouFollowIt:false
        }
    }

    /**
     * Formats the profile
     * @returns The profile
     */
    formatProfile(){
        return (<section>
            <h3>{this.state.profilesService.getZoomedProfile().loginInfo}</h3>
            {this.doFormatProfile()}
        </section>)
    }
    /**
     * Formats the profile
     * @returns The profile
     */
    doFormatProfile(){
    }

    /**
     * Renders the component
     * @returns The component
     */
    render(){
        return (this.formatProfile())
    }
}
export default ProfileComponent;