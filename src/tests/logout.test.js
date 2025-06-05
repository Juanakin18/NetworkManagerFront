import {render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import LoginUtils from "./utils/loginUtils";
import UsersDBTestHelper from "./utils/database/users";
import TFADBTestHelper from "./utils/database/tfa";
import * as Simulate from "@testing-library/user-event/dist/click";

const loginUtils=new LoginUtils();
const usersTestHelper = new UsersDBTestHelper();
const tfaTestHelper = new TFADBTestHelper();

async function initDatabase(){
    await usersTestHelper.removeUsers(1);
    await usersTestHelper.addUsers(1);

}

async function resetDatabase(){
    await usersTestHelper.removeUsers(1);

}
describe("Testing the logout", ()=>{

    beforeEach(async function(){
        await initDatabase();
        console.log("iniciando")

    })
    afterEach(async function(){
        await resetDatabase();
        console.log("cerrando")

    })
    test('Cerrar sesión con la sesión iniciada', async () => {
        render(<App />);
        await loginUtils.loginWithTFA("userPrueba0", "12345");
        loginUtils.logout();
        await waitFor(() => {
                expect(screen.getByText('Inicio de sesión')).toBeInTheDocument()
            },
            {timeout:500})
    });
    test('Cerrar sesión sin la sesión iniciada', async () => {
        render(<App />);
        var successText = screen.queryByText("Cerrar sesión");
        expext(successText).not.toBeInTheDocument();
    });



})

