class ToggleService{
    constructor() {
        this.toggledTab="login";
        this.socialMedia="multi";
    }
    setToggledTab(tab){
        this.toggledTab=tab;
        this.setSocialMedia();
    }

    getToggledTab(){
        return this.toggledTab;
    }

    setSocialMedia(){
        var tab = this.toggledTab.toLowerCase();
        if(tab.includes("reddit"))
            this.socialMedia="reddit";
        else if(tab.includes("bluesky"))
            this.socialMedia="bluesky";
        else
            this.socialMedia="multi";
    }
    getSocialMedia(){
        return this.socialMedia;
    }
}export default ToggleService