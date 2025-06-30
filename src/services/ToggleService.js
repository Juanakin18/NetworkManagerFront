/**
 * Toggle service
 */
class ToggleService{
    /**
     * Constructor function
     */
    constructor() {
        this.toggledTab="login";
        this.socialMedia="multi";
    }

    /**
     * Sets the toggled tab
     * @param tab The toggled tab
     */
    setToggledTab(tab){
        this.toggledTab=tab;
        this.setSocialMedia();
    }

    /**
     * Gets the toggled tab
     * @returns The toggled tab
     */
    getToggledTab(){
        return this.toggledTab;
    }

    /**
     * Sets the social media
     */
    setSocialMedia(){
        var tab = this.toggledTab.toLowerCase();
        if(tab.includes("reddit"))
            this.socialMedia="reddit";
        else if(tab.includes("bluesky"))
            this.socialMedia="bluesky";
        else
            this.socialMedia="multi";
    }

    /**
     * Returns the social media
     * @returns The social media
     */
    getSocialMedia(){
        return this.socialMedia;
    }
}export default ToggleService