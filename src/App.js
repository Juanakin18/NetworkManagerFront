
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
import MultiFeedMainViewComponent from "./components/mainViews/MultiFeedMainViewComponent";
import PostSubmitComponent from "./components/posts/submit/PostSubmitComponent";
import RedditMainViewComponent from "./components/mainViews/RedditMainViewComponent";
import BlueskyMainViewComponent from "./components/mainViews/BlueskyMainViewComponent";
import RedditThreadComponent from "./components/posts/postThreads/RedditThreadComponent";
import BlueskyThreadComponent from "./components/posts/postThreads/BlueskyThreadComponent";
import useWebSocket, {ReadyState} from "react-use-websocket";
import TokensService from "./services/tokensService";
import Login from "./components/users/login";
import PostsRepository from "./repositories/postsRepository";
import PostsService from "./services/PostsService";
import FeedsRepository from "./repositories/feedsRepository";
import FeedsService from "./services/feedsService";
import SubredditComponent from "./components/feeds/SubredditComponent";
import BlueskyFeedComponent from "./components/feeds/BlueskyFeedComponent";
import RedditUserView from "./components/users/RedditUserView";
import BlueskyUserView from "./components/users/BlueskyUserView";
import RedditProfileComponent from "./components/profiles/views/RedditProfileComponent";
import BlueskyProfileComponent from "./components/profiles/views/BlueskyProfileComponent";
import WebsocketsManager from "./websockets/WebsocketsManager";
import EventManager from "./websockets/EventManager";
import ToggleService from "./services/ToggleService"

/**
 * Main App
 * @returns The main app
 */
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

    /**
     * Refreshes the app
     */
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

    /**
     * Updates the refresh info
     * @param data The refresh info
     */
  function updateRedditRefreshedInfo(data){
      setRedditRefreshedInfo(true);
      tokensService.setIsRefreshed(true);
  }

    /**
     * Gets the reddit refresh info
     * @returns The refresh info
     */
  function getRedditRefreshedInfo(){
      var result = tokensService.getIsRefreshed();
      tokensService.setIsRefreshed(false);
      return result;
  }

    /**
     * Updates the app with data
     * @param data The data
     */
  function update(data){
      setLoggedInfo(usersService.getLoggedUser());
      if(usersService.getLoggedUser()!=null){
          toggle("multiMainView")
      }
      else
          toggle("login");
  }

    /**
     * Fetches data from the server
     */
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

    /**
     * Displays the main view
     */
    async function toggleToMain(){
        toggle("multiMainView");

        var selectedProfileBluesky = profilesService.getSelectedProfile("bluesky");
        var posts = await postsService.findPosts("bluesky", "bluesky", selectedProfileBluesky);
        var selectedProfileReddit= profilesService.getSelectedProfile("reddit");
        var postsReddit = await postsService.findDefault("reddit", selectedProfileReddit);
        setFetched(!fetched);
    }

    /**
     * Refreshes the profiles list
     */
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


    /**
     * Map which contains the app tabs
     */
    const mainComponentsMap = {
        multiMainView:
            <MultiFeedMainViewComponent blueskyPostsList={[]}
                                        zoomPost={toggleToPost}
                                        zoomUser={toggleToUser}
                                        zoomFeed={toggleToFeed}
                                        feedsService={feedsService}
                                        profilesService={profilesService}
                                        postsService={postsService}>
            </MultiFeedMainViewComponent>,
        login: <Login usersService = {usersService}
                   setLoggedInfo={setLoggedInfo}
                   getUserID={userID}
                      toggle={toggle}>

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

    /**
     * Gets the toggled tab
     * @returns The toggled tab
     */
    function getToggled(){
        return toggledTabService.getToggledTab();
    }
    /**
     * Gets the selected social media
     * @returns The selected social media
     */
    function getSelectedSocialMedia(){
        return toggledTabService.getSocialMedia();
    }

    /**
     * Toggles a tab
     * @param toggleState The tab to be toggled
     */
    function toggle(toggleState){
        setRedditRefreshedInfo(false);
        tokensService.setIsRefreshed(false);
        profilesService.resetRefreshed();
        setToggled(toggleState);
        toggledTabService.setToggledTab(toggleState);
    } /**
     * Toggles a post
     * @param network The social network
     * @param post The post
     */
    async function toggleToPost(network, post){
        var post = await postsService.getPostById(network,post);
        setSelectedPost(post);
        toggle(network+"Post")
    }

    /**
     * Toggles to a user
     * @param network The social network
     * @param profile The user
     * @param isSelf If it is yours or not
     */
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

    /**
     * Toggles to a feed
     * @param network The network
     * @param feed The feed
     */
    async function toggleToFeed(network, feed){
        var result = await feedsService.fetchInfoFromFeed(network, feed, profilesService.getSelectedProfile(network));
        postsService.setPostsFromFeeds(result.posts);
        toggle(network+"Feed")
    }

    /**
     * Toggles to a single feed
     * @param network The network of the feed
     */
    function toggleToUniFeed(network){
        toggle(network+"MainView");
    }

    /**
     * Manages the toggle
     * @returns The component of the toggled map
     */
    function manageToggle(){
        return mainComponentsMap[toggled];
    }

    /**
     * Logs out
     */
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


    /**
     * Handles the sidebar
     * @returns The sidebar
     */
    function manageSidebar(){
        return <SidebarComponent  toggle={()=>toggle("addProfile")}
                                  profilesList={profiles}
                                  profilesService={profilesService}
                                  zoomUser={toggleToUser} getSocialMedia={()=>getSelectedSocialMedia}>

        </SidebarComponent>
    }
    return (
      <Box sx={{ display: 'flex' }} alignItems="center"
           alignSelf={"center"}
           justifyContent="center">
          <CssBaseline />
          <NavBarComponent toggle={toggle} toggleToFeed={toggleToUniFeed} usersService={usersService} logout={logout} getToggle={getToggled}></NavBarComponent>
          {manageSidebar()}
          <Box sx={{ paddingTop:"4em", width:"80%", height:"100%"}}component="main"
               >
              {manageToggle()}
          </Box>
      </Box>

  );
}

export default App;
