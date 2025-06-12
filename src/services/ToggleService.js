class ToggleService{
    constructor() {
        this.toggledTab="login";
    }
    setToggledTab(tab){
        this.toggledTab=tab;
    }

    getToggledTab(){
        return this.toggledTab;
    }
}export default ToggleService