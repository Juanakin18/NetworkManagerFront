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
import SidebarComponent from "./components/SidebarComponent";
import FeedsComponent from "./components/feeds/FeedsComponent";
import PostSubmitComponent from "./components/posts/submit/PostSubmitComponent";
import RedditFeedComponent from "./components/feeds/feeds/RedditFeedComponent";
import BlueskyFeedComponent from "./components/feeds/feeds/BlueskyFeedComponent";
import RedditThreadComponent from "./components/posts/postThreads/RedditThreadComponent";
import BlueskyThreadComponent from "./components/posts/postThreads/BlueskyThreadComponent";

function App() {


  const usersRepository = new UsersRepository();
  const usersService = new UsersService(usersRepository);

  const profilesRepository = new ProfilesRepository();
  const profilesService = new ProfilesService(profilesRepository);

  const [selectedPost, setSelectedPost] = useState({});
    const [toggled,setToggled] = useState("login");


    const [loggedInfo, setLoggedInfo] = useState("");

    const listaPerfilesMock = [
        {login:"NetworkManager1",
        socialMedia: "Reddit"},
        {login:"NetworkManager1",
            socialMedia: "Bluesky"},
        {login:"NetworkManager2",
            socialMedia: "Reddit"},
        {login:"NetworkManager2",
            socialMedia: "Bluesky"},
    ]

    const blueskyPostsList = [
        {
            title:"Titulo1",
            content:"Content1",
            foto:"foto1",
            likes:2,
            reposts:3,
            replies:4,
            repliesList:[]
        },
        {
            title:"Titulo1",
            content:"Content1",
            foto:"foto1",
            likes:2,
            reposts:3,
            replies:4,
            repliesList:[]
        },
        {
            title:"Titulo1",
            content:"Content1",
            foto:"foto1",
            likes:2,
            reposts:3,
            replies:4,
            repliesList:[]
        },
        {
            title:"Titulo1",
            content:"Content1",
            foto:"foto1",
            likes:2,
            reposts:3,
            replies:4,
            repliesList:[]
        },
        {
            title:"Titulo1",
            content:"Content1",
            foto:"foto1",
            likes:2,
            reposts:3,
            replies:4,
            repliesList:[]
        },
    ]

    const redditPostsList = [
        {
            title:"Titulo1",
            content:"Content1",
            foto:"foto1",
            score:2,
            comments:3,
            repliesList:[]
        }
    ]

    const mainComponentsMap = {
        multiFeed:<section className={"mainSection"}>
            <FeedsComponent  blueskyPostsList={blueskyPostsList} redditPostsList={redditPostsList} zoomPost={toggleToPost}></FeedsComponent>
        </section>,
        login:<section className={"mainSection"}>
            <LoginAndSignUpComponent setLoggedInfo={setLoggedInfo}usersService = {usersService}  getToggled={toggled} ></LoginAndSignUpComponent>
        </section>,
        redditFeed:<section className={"mainSection"}>
            <RedditFeedComponent postsList={redditPostsList} zoomPost={toggleToPost}></RedditFeedComponent>
        </section>,
        blueskyFeed:<section className={"mainSection"}>
            <BlueskyFeedComponent postsList={redditPostsList} zoomPost={toggleToPost}></BlueskyFeedComponent>
        </section>,
        redditPost:<section className={"mainSection"}>
            <RedditThreadComponent post={selectedPost}></RedditThreadComponent>
        </section>,
        blueskyPost:<section className={"mainSection"}>
            <BlueskyThreadComponent post={selectedPost}></BlueskyThreadComponent>
        </section>,
        submitPost:<section className={"mainSection"}>
            <PostSubmitComponent></PostSubmitComponent>
        </section>,
        addProfile:<section className={"mainSection"}>
            <AddProfileComponent></AddProfileComponent>
        </section>

    }

    function toggle(toggleState){
        setToggled(toggleState);
    }
    function toggleToPost(network, post){
        setSelectedPost(post);
        setToggled(network+"Post")
    }
    function toggleToUniFeed(network){
        setToggled(network+"Feed");
    }

    function manageToggle(){
        return mainComponentsMap[toggled];
    }
  return (
    <div className={"root"}>
      <header >
        <NavBarComponent toggle={toggle} toggleToFeed={toggleToUniFeed}></NavBarComponent>
      </header>
      <main>
          <section>
              <SidebarComponent listaRedes={listaPerfilesMock} toggle={()=>toggle("addProfile")}></SidebarComponent>
              <article >
                  {manageToggle()}
              </article>
          </section>
      </main>

    </div>
  );
}

export default App;
