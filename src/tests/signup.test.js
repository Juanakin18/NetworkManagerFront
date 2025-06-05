import {render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import LoginUtils from "./utils/loginUtils";
import UsersDBTestHelper from "./utils/database/users";
import TFADBTestHelper from "./utils/database/tfa";

const loginUtils=new LoginUtils();
const usersTestHelper = new UsersDBTestHelper();

async function initDatabase(){
    await usersTestHelper.removeUsers(1);
    await usersTestHelper.addUsers(1);

}

async function resetDatabase(){
    await usersTestHelper.removeUsers(1);

}

describe("Testing the login", ()=>{

    beforeEach(async function(){
        await initDatabase();
        console.log("iniciando")

    })
    afterEach(async function() {
        await resetDatabase();
        console.log("cerrando")
    })
    test('Registro con credenciales válidas', async () => {
        render(<App />);
        loginUtils.signup("inexistente", "userpruebasignup@email.com", "12345", "12345");
        await waitFor(() => {
                expect(screen.getByText('Se ha registrado correctamente')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Registro con nombre de usuario repetido', async () => {
        render(<App />);
        loginUtils.signup("userPrueba0", "userpruebasignup@email.com", "12345", "12345");
        await waitFor(() => {
                expect(screen.getByText('Este usuario ya existe')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Registro con nombre de usuario vacío', async () => {
        render(<App />);
        loginUtils.signup("", "userpruebasignup@email.com", "12345", "12345");
        await waitFor(() => {
                expect(screen.getByText('El usuario no puede estar en blanco')).toBeInTheDocument()
            },
            {timeout:500})
    });
    test('Registro con nombre de usuario nulo', async () => {
        render(<App />);
        loginUtils.signup(undefined, "userpruebasignup@email.com", "12345", "12345");
        await waitFor(() => {
                expect(screen.getByText('El usuario no puede ser nulo')).toBeInTheDocument()
            },
            {timeout:500})
    });


    test('Registro con email de usuario repetido', async () => {
        render(<App />);
        loginUtils.signup("inexistente", "usuarioPrueba0@email.com", "12345", "12345");
        await waitFor(() => {
                expect(screen.getByText('Este email ya está registrado')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Registro con email vacío', async () => {
        render(<App />);
        loginUtils.signup("inexistente", "", "12345", "12345");
        await waitFor(() => {
                expect(screen.getByText('El email no puede estar en blanco')).toBeInTheDocument()
            },
            {timeout:500})
    });
    test('Registro con email nulo', async () => {
        render(<App />);
        loginUtils.signup("inexistente", undefined, "12345", "12345");
        await waitFor(() => {
                expect(screen.getByText('El email no puede ser nulo')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Registro con email sin punto', async () => {
        render(<App />);
        loginUtils.signup("userPrueba0", "userpruebasignup@emailcom", "12345", "12345");
        await waitFor(() => {
                expect(screen.getByText('El email debe contener un punto y una arroba')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Registro con email sin arroba', async () => {
        render(<App />);
        loginUtils.signup("userPrueba0", "userpruebasignupemail.com", "12345", "12345");
        await waitFor(() => {
                expect(screen.getByText('El email debe contener un punto y una arroba')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Registro con contraseña vacía', async () => {
        render(<App />);
        loginUtils.signup("inexistente", "userpruebasignup@email.com", "", "12345");
        await waitFor(() => {
                expect(screen.getByText('La contraseña no puede estar vacía')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Registro con contraseña nula', async () => {
        render(<App />);
        loginUtils.signup("inexistente", "userpruebasignup@email.com", undefined, "12345");
        await waitFor(() => {
                expect(screen.getByText('La contraseña no puede ser nula')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Registro con repetición de contraseña vacía', async () => {
        render(<App />);
        loginUtils.signup("inexistente", "userpruebasignup@email.com", "12345", "");
        await waitFor(() => {
                expect(screen.getByText('La repetición de la contraseña no puede estar vacía')).toBeInTheDocument()
            },
            {timeout:500})
    });
    test('Registro con repetición de contraseña nula', async () => {
        render(<App />);
        loginUtils.signup("inexistente", "userpruebasignup@email.com", "12345", undefined);
        await waitFor(() => {
                expect(screen.getByText('La repetición de la contraseña no puede ser nula')).toBeInTheDocument()
            },
            {timeout:500})
    });
    test('Registro con las contraseñas distintas', async () => {
        render(<App />);
        loginUtils.signup("inexistente", "userpruebasignup@email.com", "12345", "54321");
        await waitFor(() => {
                expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument()
            },
            {timeout:500})
    });



})

