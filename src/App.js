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
import RedditMainViewComponent from "./components/feeds/mainViews/RedditMainViewComponent";
import BlueskyMainViewComponent from "./components/feeds/mainViews/BlueskyMainViewComponent";
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
import FeedsRepository from "./users/repositories/feedsRepository";
import FeedsService from "./users/services/feedsService";
import SubredditComponent from "./components/feeds/feeds/SubredditComponent";
import BlueskyFeedComponent from "./components/feeds/feeds/BlueskyFeedComponent";
import RedditUserView from "./components/feeds/users/RedditUserView";
import BlueskyUserView from "./components/feeds/users/BlueskyUserView";

function App() {


  const usersRepository = new UsersRepository();
  const [usersService, setUsersService] = useState(new UsersService(usersRepository, update));

  const tokensService = new TokensService();
  const profilesRepository = new ProfilesRepository();
  const [profilesService, setProfilesService] = useState(new ProfilesService(profilesRepository, usersService.getLoggedUser));

  const postsRepository = new PostsRepository();
  const [postsService, setPostsService] = useState(new PostsService(profilesService,postsRepository,usersService));

  const feedsRepository = new FeedsRepository();
  const [feedsService, setFeedsService] = useState(new FeedsService(feedsRepository));

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
        multiMainView:
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
        redditMainView:
            <RedditMainViewComponent
                                 zoomPost={toggleToPost}
                                 zoomUser={toggleToUser}
                                 zoomFeed={toggleToFeed}
                                 profilesService={profilesService}
                                 feedsService={feedsService}
                                 profilesService={profilesService}
                                 postsService={postsService}

            ></RedditMainViewComponent>,
        blueskyMainView:
            <BlueskyMainViewComponent zoomPost={toggleToPost}
                                      zoomUser={toggleToUser}
                                      zoomFeed={toggleToFeed}
                                      profilesService={profilesService}
                                      feedsService={feedsService}
                                      profilesService={profilesService}
                                      postsService={postsService}
            ></BlueskyMainViewComponent>,
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
            ></AddProfileComponent>,
        redditFeed: <SubredditComponent feedsService={feedsService}
                                        zoomPost={toggleToPost}
                                        postsService={postsService}
                                        profilesService={profilesService}
        ></SubredditComponent>,
        blueskyFeed:<BlueskyFeedComponent feedsService={feedsService}
                                          zoomPost={toggleToPost}
                                          postsService={postsService}
                                          profilesService={profilesService}
        ></BlueskyFeedComponent>,
        redditUser:<RedditUserView feedsService={feedsService}
                                   zoomPost={toggleToPost}
                                   postsService={postsService}
                                   profilesService={profilesService}
                                   usersService={usersService}
        ></RedditUserView>,
        blueskyUser:<BlueskyUserView feedsService={feedsService}
                                     zoomPost={toggleToPost}
                                     postsService={postsService}
                                     profilesService={profilesService}
                                     usersService={usersService}
        ></BlueskyUserView>


    }

    function toggle(toggleState){
        setToggled(toggleState);
    }
    function toggleToPost(network, post){
        setSelectedPost(post);
        setToggled(network+"Post")
    }
    async function toggleToUser(network, profile){
        var result = await profilesService.getProfileInfo(profile);
        setToggled(network+"User")
    }
    async function toggleToFeed(network, feed){
        var result = await feedsService.fetchInfoFromFeed(feed);
        setToggled(network+"Feed")
    }
    function toggleToUniFeed(network){
        setToggled(network+"MainView");
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
                    //var profiles = await profilesService.getAllProfiles();
                    //setProfiles(profiles)
                }
            }
        }
        if(loggedInfo==undefined || loggedInfo==null)
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
