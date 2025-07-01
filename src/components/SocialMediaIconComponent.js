import React from "react";
import redditIcon from "../media/icons/reddit.png";
import blueskyIcon from "../media/icons/bluesky.png";

/**
 * Social media Icon component
 * @param props The props
 * @returns The formatted icon component
 */
function SocialMediaIconComponent(props){
    /**
     * The icons
     */
    const icons = {
        reddit:redditIcon,
        bluesky:blueskyIcon
    };

    return (
        <img className={"socialMediaIcon"} src={icons[props.socialMedia]} alt={props.socialMedia}/>
    );
}

export default SocialMediaIconComponent;