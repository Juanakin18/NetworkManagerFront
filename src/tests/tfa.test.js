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
describe("Testing the two factor authentication", ()=>{

    beforeEach(async function(){
        await initDatabase();
        console.log("iniciando")

    })
    afterEach(async function(){
        await resetDatabase();
        console.log("cerrando")

    })
    test('Meter el número correcto', async () => {
        render(<App />);
        loginUtils.login("userPrueba0", "12345");
        await waitFor(() => {
                expect(screen.getByText('Autenticación de doble factor')).toBeInTheDocument()
            },
            {timeout:500})
        var number = await tfaTestHelper.getNumberFromUser("userPrueba0");
        loginUtils.verifyTFA(number);
        await waitFor(() => {
                expect(screen.getByText('Reddit')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Meter el número incorrecto', async () => {
        render(<App />);
        loginUtils.login("userPrueba0", "12345");
        await waitFor(() => {
                expect(screen.getByText('Autenticación de doble factor')).toBeInTheDocument()
            },
            {timeout:500})
        var number = await tfaTestHelper.getNumberFromUser("userPrueba0");
        loginUtils.verifyTFA(number+1);
        await waitFor(() => {
                expect(screen.getByText('El número es incorrecto')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('No meter número', async () => {
        render(<App />);
        loginUtils.login("userPrueba0", "12345");
        await waitFor(() => {
                expect(screen.getByText('Autenticación de doble factor')).toBeInTheDocument()
            },
            {timeout:500})
        var button = screen.getByText("Comprobar doble factor");
        Simulate.click(button);
        await waitFor(() => {
                expect(screen.getByText('El número es incorrecto')).toBeInTheDocument()
            },
            {timeout:500})
    });


})

