import {render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import LoginUtils from "./utils/loginUtils";

const loginUtils=new LoginUtils();


describe("Testing the login", ()=>{
    test('Inicio de sesión con datos válidos', async () => {
        render(<App />);
        loginUtils.login("yulva1", "12345");
        await waitFor(() => {
                expect(screen.getByText('Autenticación de doble factor')).toBeInTheDocument()
            },
            {timeout:500})
    });

    test('Inicio de sesión con usuario inexistente', async () => {
        render(<App />);
        loginUtils.login("yulva", "12345");
        await waitFor(() => {
                expect(screen.getByText('El usuario no existe')).toBeInTheDocument()
                var successText = screen.queryByText("Autenticación de doble factor");
                expext(successText).not.toBeInTheDocument();
            },
            {timeout:1000})
    });

    test('Inicio de sesión con usuario vacío', async () => {
        render(<App />);
        loginUtils.login("", "12345");
        await waitFor(() => {
                expect(screen.getByText('El usuario no puede estar vacío')).toBeInTheDocument()
                var successText = screen.queryByText("Autenticación de doble factor");
                expext(successText).not.toBeInTheDocument();
            },
            {timeout:1000})
    });

    test('Inicio de sesión con usuario nulo', async () => {
        render(<App />);
        loginUtils.login(undefined, "12345");
        await waitFor(() => {
                expect(screen.getByText('El usuario no puede ser nulo')).toBeInTheDocument()
                var successText = screen.queryByText("Autenticación de doble factor");
                expext(successText).not.toBeInTheDocument();
            },
            {timeout:1000})
    });

    test('Inicio de sesión con contraseña vacía', async () => {
        render(<App />);
        loginUtils.login("yulva1", "");
        await waitFor(() => {
                expect(screen.getByText('La contraseña no puede estar en blanco')).toBeInTheDocument()
                var successText = screen.queryByText("Autenticación de doble factor");
                expext(successText).not.toBeInTheDocument();
            },
            {timeout:500})
    });

    test('Inicio de sesión con contraseña nula', async () => {
        render(<App />);
        loginUtils.login("yulva1", undefined);
        await waitFor(() => {
                expect(screen.getByText('La contraseña no puede ser nula')).toBeInTheDocument()
                var successText = screen.queryByText("Autenticación de doble factor");
                expext(successText).not.toBeInTheDocument();
            },
            {timeout:500})
    });

    test('Inicio de sesión con ambos vacíos', async () => {
        render(<App />);
        loginUtils.login("", "");
        await waitFor(() => {
                expect(screen.getByText('La contraseña no puede estar en blanco')).toBeInTheDocument()
                expect(screen.getByText('El usuario no puede estar vacío')).toBeInTheDocument()
                var successText = screen.queryByText("Autenticación de doble factor");
                expext(successText).not.toBeInTheDocument();
            },
            {timeout:500})
    });


})

