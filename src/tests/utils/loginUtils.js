import NavBarUtils from "./navBarUtils";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import expect from "expect";
import * as Simulate from "@testing-library/user-event/dist/click";
import FieldUtils from "./fieldUtils";
import TFADBTestHelper from "./database/tfa";

class LoginUtils{
    constructor() {
        this.navBarUtils = new NavBarUtils();
        this.fieldUtils = new FieldUtils();
        this.tfaTestHelper = new TFADBTestHelper();
    }

    login(username, password){
        this.navBarUtils.toggleTo("Login")
        this.fieldUtils.fillFieldByPlaceholder("Nombre de usuario",username);
        this.fieldUtils.fillFieldByPlaceholder("Password",password);
        var button = screen.getByText("Iniciar sesión");
        Simulate.click(button);
    }

    async loginWithTFA(username, password){
        this.navBarUtils.toggleTo("Login")
        this.fieldUtils.fillFieldByPlaceholder("Nombre de usuario",username);
        this.fieldUtils.fillFieldByPlaceholder("Password",password);
        var button = screen.getByText("Iniciar sesión");
        Simulate.click(button);
        await waitFor(() => {
                expect(screen.getByText('Autenticación de doble factor')).toBeInTheDocument()

            },
            {timeout:500})
        var number = await this.tfaTestHelper.getNumberFromUser(username);
        this.verifyTFA(number);
        await waitFor(() => {
                expect(screen.getByText('Feed de Reddit')).toBeInTheDocument()
            },
            {timeout:500})
    }


    signup(username, email, password, repeatPassword){
        this.navBarUtils.toggleTo("Registrarse");
        this.fieldUtils.fillFieldByPlaceholder("Nombre de usuario",username);
        this.fieldUtils.fillFieldByPlaceholder("Password",password);
        this.fieldUtils.fillFieldByPlaceholder("Email",email);
        this.fieldUtils.fillFieldByPlaceholder("Repetir password",repeatPassword);
        var button = screen.getByText("Registrar");
        Simulate.click(button);
    }

    verifyTFA(number){
        this.fieldUtils.fillFieldByPlaceholder("Número de verificación",number);
        var button = screen.getByText("Comprobar doble factor");
        Simulate.click(button);
    }

    logout(){
        this.navBarUtils.toggleTo("Cerrar sesión");
    }
}export default LoginUtils;