import logo from './logo.svg';
import './App.css';
import UsersRepository from "./users/repositories/UsersRepository";
import UsersService from "./users/services/UsersService";
import Signup from "./users/signup";
import LoginAndSignUpComponent from "./users/LoginAndSignupComponent";
import Sidebar from "./components/SidebarComponent";
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import NavBarComponent from "./components/NavBarComponent";
import React, {useEffect, useState} from "react";
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
import useWebSocket, {ReadyState} from "react-use-websocket";
import TokensService from "./users/services/tokensService";
import Login from "./users/login";
import {CookieJar} from "tough-cookie";
import {wrapper} from "axios-cookiejar-support";
import axios from "axios";
import PostsRepository from "./users/repositories/posts/postsRepository";
import PostsService from "./users/services/posts/PostsService";

function App() {


  const usersRepository = new UsersRepository();
  const [usersService, setUsersService] = useState(new UsersService(usersRepository, update));

  const tokensService = new TokensService();
  const profilesRepository = new ProfilesRepository();
  const [profilesService, setProfilesService] = useState(new ProfilesService(profilesRepository, tokensService, usersService.getLoggedUser));

  const postsRepository = new PostsRepository();
  const [postsService, setPostsService] = useState(new PostsService(profilesService,postsRepository,usersService));

  const [profiles, setProfiles] =useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [toggled,setToggled] = useState("login");

  const [loggedInfo, setLoggedInfo] = useState(usersService.getLoggedUser());

  function update(){
      setLoggedInfo(usersService.getLoggedUser());
      if(usersService.getLoggedUser()!=null){
          toggle("multiFeed")
      }
      else
          toggle("login");
  }

  const [userID, setUserID] = useState("");
  const WS_URL = "ws://127.0.0.1:4000";

    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("WebSocket connection established.");
        },
        onMessage:async (event)=>{
            console.log("Mensaje recibido")
            var data = event.data;
            var json = JSON.parse(data);
            console.log(json.msg);
            if(json.type=="userID"){
                setUserID(json.id);
            }
            if(json.type=="TOKENS"){
               await tokensService.addToken(json.redSocial, loggedInfo, json.profile, json.tokens)
            }
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true,
    });

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
    const mainComponentsMap = {
        multiFeed:
            <FeedsComponent  blueskyPostsList={blueskyPostsList}
                             zoomPost={toggleToPost}
                             profilesService={profilesService}
                                postsService={postsService}>
            </FeedsComponent>,
        login: <Login usersService = {usersService}
                   setLoggedInfo={setLoggedInfo}
                   getUserID={userID}>

            </Login>,
        signup:
            <Signup usersService = {usersService}
            ></Signup>,
        redditFeed:
            <RedditFeedComponent
                                 zoomPost={toggleToPost}
                                 profilesService={profilesService}
                                 postsService={postsService}>
            </RedditFeedComponent>,
        blueskyFeed:
            <BlueskyFeedComponent
                                  zoomPost={toggleToPost}
                                  profilesService={profilesService}
                                  postsService={postsService}>
            </BlueskyFeedComponent>,
        redditPost:
            <RedditThreadComponent post={selectedPost}
                                   profilesService={profilesService}
                                   postsService={postsService}>
            </RedditThreadComponent>,
        blueskyPost:
            <BlueskyThreadComponent post={selectedPost}
                                    profilesService={profilesService}
                                    postsService={postsService}>
            </BlueskyThreadComponent>,
        submitPost:
            <PostSubmitComponent
                profilesService={profilesService}
                postsService={postsService}
            ></PostSubmitComponent>,
        addProfile:
            <AddProfileComponent getLoggedInfo={loggedInfo}
                                 profilesService={profilesService}
                                 getUserID={userID}
                                 usersService={usersService}
            ></AddProfileComponent>


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

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                msg:"mensaje",
                type: "userevent",
            });
        }
    }, [sendJsonMessage, readyState]);

    useEffect( function(){
        async function fetchData(){
            if(loggedInfo==undefined || loggedInfo==null){
                var user = await usersService.fetchUserFromServer();
                if(user!=loggedInfo && user!=undefined && user!=null){
                    setLoggedInfo(user.user);
                    setProfiles(user.profiles);
                }
            }
        }
        fetchData()
    })

  return (

    <div className={"root"}>
      <header >
        <NavBarComponent toggle={toggle} toggleToFeed={toggleToUniFeed} usersService={usersService}></NavBarComponent>
      </header>
      <main>
          <section>
              <SidebarComponent  toggle={()=>toggle("addProfile")} profilesList={profiles} profilesService={profilesService}></SidebarComponent>
              <article >
                  <p>Bienvenido, {loggedInfo}</p>
                  <section className={"mainSection"}>
                      {manageToggle()}
                  </section>
              </article>
          </section>
      </main>

    </div>
  );
}

export default App;
