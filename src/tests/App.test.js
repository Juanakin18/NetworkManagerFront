import { render, screen } from '@testing-library/react';
import App from '../App';
import * as Simulate from "@testing-library/user-event/dist/click";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("NetworkManager");
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Multi feed");
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Feed reddit");
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Iniciar sesión");
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Registrarse");
  Simulate.click(linkElement);
  const element = screen.getByText("Reintroducir contraseña")
  expect(element).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Verificar doble factor");
  expect(linkElement).not.toBeInTheDocument();
});



