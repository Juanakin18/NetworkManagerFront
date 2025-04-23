import logo from './logo.svg';
import './App.css';
import UsersRepository from "./users/repositories/UsersRepository";
import UsersService from "./users/services/UsersService";
import Signup from "./users/signup";
import LoginAndSignUpComponent from "./users/LoginAndSignupComponent";
import Sidebar from "./components/SidebarComponent";
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import NavBarComponent from "./components/NavBarComponent";
import {useState} from "react";
import AddProfileComponent from "./components/profiles/AddProfileComponent";
import ProfilesRepository from "./users/repositories/ProfilesRepository";
import ProfilesService from "./users/services/ProfilesService";

function InboxIcon() {
  return null;
}

function MailIcon() {
  return null;
}

function App() {


  const usersRepository = new UsersRepository();
  const usersService = new UsersService(usersRepository);

  const profilesRepository = new ProfilesRepository();
  const profilesService = new ProfilesService(profilesRepository);
    const [toggled,setToggled] = useState("login");


    const [loggedInfo, setLoggedInfo] = useState("");

  return (
    <div >
      <header >
        <NavBarComponent setToggled={setToggled}></NavBarComponent>
      </header>
      <main>
        <LoginAndSignUpComponent setLoggedInfo={setLoggedInfo}usersService = {usersService}  getToggled={toggled} ></LoginAndSignUpComponent>
        <AddProfileComponent getLoggedInfo={loggedInfo} profilesService = {profilesService}></AddProfileComponent>
      </main>

    </div>
  );
}

export default App;
