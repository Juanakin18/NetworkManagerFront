import NavBarUtils from "./navBarUtils";
import {fireEvent, screen} from "@testing-library/react";
import expect from "expect";
import * as Simulate from "@testing-library/user-event/dist/click";
import FieldUtils from "./fieldUtils";

class LoginUtils{
    constructor() {
        this.navBarUtils = new NavBarUtils();
        this.fieldUtils = new FieldUtils();
    }

    login(username, password){
        this.navBarUtils.toggleTo("Login")
        this.fieldUtils.fillFieldByPlaceholder("Nombre de usuario",username);
        this.fieldUtils.fillFieldByPlaceholder("Password",password);
        var button = screen.getByText("Iniciar sesión");
        Simulate.click(button);

    }
}export default LoginUtils;