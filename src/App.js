
import './App.css';
import UsersRepository from "./repositories/UsersRepository";
import UsersService from "./services/UsersService";
import Signup from "./components/users/signup";

import {
    Box,
    CssBaseline,
} from "@mui/material";
import NavBarComponent from "./components/NavBarComponent";
import React, {useEffect, useState} from "react";
import AddProfileComponent from "./components/profiles/AddProfileComponent";
import ProfilesRepository from "./repositories/ProfilesRepository";
import ProfilesService from "./services/ProfilesService";
import SidebarComponent from "./components/SidebarComponent";
import FeedsComponent from "./components/feeds/FeedsComponent";
import PostSubmitComponent from "./components/posts/submit/PostSubmitComponent";
import RedditMainViewComponent from "./components/feeds/mainViews/RedditMainViewComponent";
import BlueskyMainViewComponent from "./components/feeds/mainViews/BlueskyMainViewComponent";
import RedditThreadComponent from "./components/posts/postThreads/RedditThreadComponent";
import BlueskyThreadComponent from "./components/posts/postThreads/BlueskyThreadComponent";
import useWebSocket, {ReadyState} from "react-use-websocket";
import TokensService from "./services/tokensService";
import Login from "./components/users/login";
import PostsRepository from "./repositories/postsRepository";
import PostsService from "./services/PostsService";
import FeedsRepository from "./repositories/feedsRepository";
import FeedsService from "./services/feedsService";
import SubredditComponent from "./components/feeds/feeds/SubredditComponent";
import BlueskyFeedComponent from "./components/feeds/feeds/BlueskyFeedComponent";
import RedditUserView from "./components/feeds/users/RedditUserView";
import BlueskyUserView from "./components/feeds/users/BlueskyUserView";
import RedditProfileComponent from "./components/profiles/profileView/RedditProfileComponent";
import BlueskyProfileComponent from "./components/profiles/profileView/BlueskyProfileComponent";
import WebsocketsManager from "./websockets/WebsocketsManager";
import EventManager from "./websockets/EventManager";
import ToggleService from "./services/ToggleService"

function App() {
  const [eventManager, setEventManager] = useState(new EventManager());

  const [toggledTabService, setToggledTabService] = useState(new ToggleService());

  const usersRepository = new UsersRepository();
  const [usersService, setUsersService] = useState(new UsersService(usersRepository, update, eventManager));

  const tokensService = new TokensService();
  const profilesRepository = new ProfilesRepository();
  const [profilesService, setProfilesService] = useState(new ProfilesService(profilesRepository, usersService.getLoggedUser, eventManager));

  const postsRepository = new PostsRepository();
  const [postsService, setPostsService] = useState(new PostsService(profilesService,postsRepository,usersService));

  const feedsRepository = new FeedsRepository();
  const [feedsService, setFeedsService] = useState(new FeedsService(feedsRepository, profilesService));

  const [profiles, setProfiles] =useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [toggled,setToggled] = useState("login");

  const [loggedInfo, setLoggedInfo] = useState(usersService.getLoggedUser());

  const [redditRefreshedInfo, setRedditRefreshedInfo] = useState(false);
  const [hasToRefresh,setHasToRefresh]=useState(false);

  const [selectedSocialMedia, setSelectedSocialMedia] = useState("multi");
  const [user, setUser] = useState("")
    const [fetched, setFetched]=useState(false);

  async function refresh(){
      setHasToRefresh(!hasToRefresh);
      if(toggled.includes("Post")){
          await postsService.refresh();
      }
      if(toggled.includes("User")){
          await profilesService.refresh();
      }
      if(toggled.includes("Feed")){
          await feedsService.refresh();
      }
  }

  function updateRedditRefreshedInfo(data){
      setRedditRefreshedInfo(true);
      tokensService.setIsRefreshed(true);
  }
  function getRedditRefreshedInfo(){
      var result = tokensService.getIsRefreshed();
      tokensService.setIsRefreshed(false);
      return result;
  }
  function update(data){
      setLoggedInfo(usersService.getLoggedUser());
      if(usersService.getLoggedUser()!=null){
          toggle("multiMainView")
      }
      else
          toggle("login");
  }

    async function fetchData(){
      var user = await usersService.fetchUserFromServer();

      if(user.user!="" &&user.user!=loggedInfo && user.user!=undefined && user.user!=null){
          profilesService.setProfiles(user.profiles);
          setProfiles(user.profiles)
          setLoggedInfo(user.user);
          if(usersService.getLoggedUser()!=undefined && usersService.getLoggedUser()!=""){
              await toggleToMain()
          }
          else
              toggle("login");
      }
    }

    async function toggleToMain(){
        toggle("multiMainView");

        var selectedProfileBluesky = profilesService.getSelectedProfile("bluesky");
        var posts = await postsService.findPosts("bluesky", "bluesky", selectedProfileBluesky);
        var selectedProfileReddit= profilesService.getSelectedProfile("reddit");
        var postsReddit = await postsService.findDefault("reddit", selectedProfileReddit);
        setFetched(!fetched);
    }

    async function refreshProfileList(){
      var list = await profilesService.getAllProfiles();
      setProfiles(list)
    }

  const [userID, setUserID] = useState("");
  const WS_URL = "ws://127.0.0.1:4000";


    eventManager.subscribe("redditSelfView", updateRedditRefreshedInfo);
    eventManager.subscribe("tokensRefreshedBluesky", refresh);
    eventManager.subscribe("profileSelected", refresh);
    eventManager.subscribe("refreshLogin", fetchData);
    eventManager.subscribe("loginSuccess", fetchData);
    eventManager.subscribe("profileAdded", refreshProfileList);
    eventManager.subscribe("profileRemoved", refreshProfileList);

    const websocketsManager = new WebsocketsManager(tokensService, setUserID, eventManager);

    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log("WebSocket connection established.");
        },
        onMessage:async (event)=>{
            await websocketsManager.manageMessage(event, loggedInfo);
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true,
    });



    const mainComponentsMap = {
        multiMainView:
            <FeedsComponent  blueskyPostsList={[]}
                             zoomPost={toggleToPost}
                             zoomUser={toggleToUser}
                             zoomFeed={toggleToFeed}
                             feedsService={feedsService}
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
                                 postsService={postsService}

            ></RedditMainViewComponent>,
        blueskyMainView:
            <BlueskyMainViewComponent zoomPost={toggleToPost}
                                      zoomUser={toggleToUser}
                                      zoomFeed={toggleToFeed}
                                      profilesService={profilesService}
                                      feedsService={feedsService}
                                      postsService={postsService}
            ></BlueskyMainViewComponent>,
        redditPost:
            <RedditThreadComponent post={selectedPost}
                                   profilesService={profilesService}
                                   postsService={postsService}
                                   zoomUser={toggleToUser}
                                   zoomSubreddit={toggleToFeed}

            ></RedditThreadComponent>,
        blueskyPost:
            <BlueskyThreadComponent post={selectedPost}
                                    profilesService={profilesService}
                                    postsService={postsService}
                                    zoomUser={toggleToUser}
                                    zoomPost={toggleToPost}
            ></BlueskyThreadComponent>,
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
                                 zoomUser={toggleToUser}
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
        ></BlueskyUserView>,
        redditSelfProfile:<RedditProfileComponent feedsService={feedsService}
                                   zoomPost={toggleToPost}
                                   postsService={postsService}
                                   profilesService={profilesService}
                                   usersService={usersService}
                                   getUserID={userID}
                                          goBack={()=>toggle("multiMainView")}
                                                  externalData={getRedditRefreshedInfo}
        ></RedditProfileComponent>,
        blueskySelfProfile:<BlueskyProfileComponent feedsService={feedsService}
                                     zoomPost={toggleToPost}
                                     postsService={postsService}
                                     profilesService={profilesService}
                                     usersService={usersService}
                                            goBack={()=>toggle("multiMainView")}
        ></BlueskyProfileComponent>



    }

    function getToggled(){
        return toggledTabService.getToggledTab();
    }

    function getSelectedSocialMedia(){
        return toggledTabService.getSocialMedia();
    }
    function toggle(toggleState){
        setRedditRefreshedInfo(false);
        tokensService.setIsRefreshed(false);
        profilesService.resetRefreshed();
        setToggled(toggleState);
        toggledTabService.setToggledTab(toggleState);
    }
    async function toggleToPost(network, post){
        var post = await postsService.getPostById(network,post);
        setSelectedPost(post);
        toggle(network+"Post")
    }


    async function toggleToUser(network, profile, isSelf=false){
        var user = await profilesService.getProfileInfo(profile, network);
        var result = await postsService.findPostsFromUser(network,profile,"",profilesService.getSelectedProfile(network));
        profilesService.setDisplayedProfile(user);
        setUser(user);
        if(isSelf){
            toggle(network+"SelfProfile")
        }else{
            toggle(network+"User")
        }

    }
    async function toggleToFeed(network, feed){
        var result = await feedsService.fetchInfoFromFeed(network, feed, profilesService.getSelectedProfile(network));
        postsService.setPostsFromFeeds(result.posts);
        toggle(network+"Feed")
    }
    function toggleToUniFeed(network){
        toggle(network+"MainView");
    }

    function manageToggle(){
        return mainComponentsMap[toggled];
    }

    function logout(){
        usersService.logout();
        profilesService.reset();
        setLoggedInfo("");
    }


    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                msg:"mensaje",
                type: "userevent",
            });
        }
    }, [sendJsonMessage, readyState]);


    const a = <Box sx={{width:"100vw", height:"100vh"}} className={"root"} >


        {manageToggle()}

    </Box>


    function manageSidebar(){
        return <SidebarComponent  toggle={()=>toggle("addProfile")}
                                  profilesList={profiles}
                                  profilesService={profilesService}
                                  zoomUser={toggleToUser} getSocialMedia={()=>getSelectedSocialMedia}>

        </SidebarComponent>
    }
    let drawerWidth = 400;
    return (
      <Box sx={{ display: 'flex' }} alignItems="center"
           alignSelf={"center"}
           justifyContent="center">
          <CssBaseline />
          <NavBarComponent toggle={toggle} toggleToFeed={toggleToUniFeed} usersService={usersService} logout={logout} getToggle={getToggled}></NavBarComponent>
          {manageSidebar()}
          <Box sx={{ paddingTop:"4em", width:"100%", height:"100%"}}component="main"
               >
              {manageToggle()}
          </Box>
      </Box>

  );
}

export default App;
