import NavBarUtils from "./navBarUtils";
import FieldUtils from "./fieldUtils";
import {screen} from "@testing-library/react";
import * as Simulate from "@testing-library/user-event/dist/click";

class ProfilesTestsUtils{
    constructor() {
        this.navBarUtils = new NavBarUtils();
        this.fieldUtils = new FieldUtils();
    }

    addProfileReddit(username){
        this.navBarUtils.toggleTo("Añadir perfil")
        this.fieldUtils.fillAutoCompleteByTestID("addProfileSocialMedia","reddit");
        this.fieldUtils.fillFieldByPlaceholder("Nombre del perfil",username);
        var button = screen.getByText("Añadir perfil");
        Simulate.click(button);
        this.fieldUtils.fillFieldByPlaceholder("username",username);
        this.fieldUtils.fillFieldByPlaceholder("password","password");
        var button = screen.getByText("Añadir perfil de reddit");
        Simulate.click(button);
    }

    addProfileBluesky(username, password){
        this.navBarUtils.toggleTo("Añadir perfil")
        this.fieldUtils.fillFieldByTestId("addProfileSocialMedia","bluesky");
        this.fieldUtils.fillFieldByPlaceholder("Nombre del perfil",username);
        this.fieldUtils.fillFieldByPlaceholder("Contraseña",password);
        var button = screen.getByText("Añadir perfil");
        Simulate.click(button);
    }
    viewSelfProfile(socialMedia, profile){
        var button = screen.getByTestId("sidebarProfile"+socialMedia+profile);
        Simulate.click(button);
    }
    deleteProfile(socialMedia, profile){
        this.viewSelfProfile(socialMedia, profile);
        var button = screen.getByText("Borrar");
        Simulate.click(button);
    }
    selectSelfProfile(socialMedia, profile){
        var button = screen.getByTestId("sidebarProfile"+socialMedia+profile+"Select");
        Simulate.click(button);
    }

    deselectSelfProfile(socialMedia, profile){
        var button = screen.getByTestId("sidebarProfile"+socialMedia+profile+"Deselect");
        Simulate.click(button);
    }

}export default ProfilesTestsUtils