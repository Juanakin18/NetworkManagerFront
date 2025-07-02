import React from "react";
import FeedList from "../feeds/FeedList";
import {Box, Button, Card, FormControlLabel, FormLabel, Input, Radio, RadioGroup, Typography} from "@mui/material";

/**
 * Social media main view component
 */
class SocialMediaMainViewComponent extends React.Component{

    /**
     * Constructor function
     * @param props The props
     */
    constructor(props) {
        super(props);
        this.state = {
            postsList:[],
            feedsList:[],
            usersList:[],
            zoomPost: props.zoomPost,
            zoomFeed:props.zoomFeed,
            zoomUser:props.zoomUser,
            searchTerm:"",
            user:"",
            feed:"",
            postsService:props.postsService,
            feedsService:props.feedsService,
            profilesService:props.profilesService,
            toggled:"posts",
            selectedCriteria:"text"
        }
        this.tabs={
            feeds:this.formatFeedsTab,
            posts:this.formatPostsTab,
            users:this.formatUsersTab
        }
        this.postCriteria=[
            {id:"text",
                text:"Contenido"},
            {id:"feed",
                text:"Feed"},
            {
                id:"user",
                text:"Autor"
            }

        ];

        this.tabNames=[]
        this.marginLeft="1em";
        if(props.marginLeft!==undefined)
            this.marginLeft= props.marginLeft;
    }

    /**
     * Formats the feed tab
     * @returns The feed tab
     */
    formatFeedsTab(){
        return [<Card sx={{bgcolor:"white",padding:"1em"}} className={"searchBar"}>
                    <FormLabel  sx={{color:"black", display:"flex", flexDirection:"column"}}>
                        Buscar {this.doFormatFeedName()}
                        <Input  sx={{marginLeft:"1em",marginRight:"1em", color:"black"}} id={"searchTerm"}
                                  type={"text"} onInput={this.handleSearchTermFeed.bind(this)}/>
                    </FormLabel>

                    <Button id={"searchButton"} sx={{bgcolor:"accents.main", color:"accents.text"}}
                             onClick={this.fetchFeeds.bind(this)}>Buscar por texto</Button>

            </Card>,
                this.formatFeeds()]

    }

    /**
     * Formats the feed search
     * @returns The feed search
     */
    formatFeedSearch(){
        return[<FormLabel>
            Buscar {this.doFormatFeedName()}
        </FormLabel>,
            <Input type={"text"} onInput={this.handleSearchTermFeed.bind(this)}/>];
    }

    /**
     * Formats the posts tab
     * @returns The posts tab
     */
    formatPostsTab(){
        return [<Card  sx={{color:"black",bgcolor:"white",padding:"1em", display:"flex",flexDirection:"column"}} className={"searchTerms"}>
            <Box>
                <FormLabel sx={{color:"black", display:"flex", flexDirection:"column"}}>
                    Término a buscar
                    <Input  id={"searchTerm"} sx={{marginLeft:"1em"}} type={"text"} onInput={this.handleSearchTerm.bind(this)}/>
                </FormLabel>

            </Box>
            {this.formatSelectFilter()}
            <Button id={"searchButton"}  sx={{bgcolor:"accents.main", color:"accents.text"}}
                    onClick={this.fetchPosts.bind(this)}>Buscar</Button>

                </Card>,
               this.formatPosts()
                ]
    }

    /**
     * Formats the select filter
     * @returns The select filter
     */
    formatSelectFilter(){
        const buttons = this.postCriteria.map((criteria) => {
            return <FormControlLabel value={criteria.id}
                                     id={"criteria" + criteria.id}
                                     control={<Radio sx={{color: "accents.main"}} color={"white"}/>}
                                     label={criteria.text}
                                     sx={{color: "black"}}
            />

        });
        return <FormLabel sx={{color:"black"}}>
            Filtrar por:
            <RadioGroup defaultValue={"text"}
                        onChange={this.handleSearchFilter.bind(this)}
                        sx={{
                            display:"flex",
                            flexDirection:"row"
                        }}
            >
                {buttons}
            </RadioGroup>
        </FormLabel>
    }

    /**
     * Handles the search filter
     * @param event The filter event
     */
    handleSearchFilter(event){
        var value = event.target.value;
        this.setState({selectedCriteria:value});
    }

    /**
     * Formats the users tab
     * @returns The users tab
     */
    formatUsersTab(){
            return  [<Card  sx={{bgcolor:"white",padding:"1em"}}  className={"searchTerms"}>
                    <FormLabel sx={{color:"black", display:"flex", flexDirection:"column"}}>
                        Usuario a buscar
                        <Input  sx={{marginLeft:"1em",marginRight:"1em", color:"black"}}
                                 id={"searchTerm"}
                                 type={"text"} onInput={this.handleSearchTermUser.bind(this)}/>
                    </FormLabel>

                    <Button id={"searchButton"}
                        sx={{bgcolor:"accents.main", color:"accents.text"}}
                        onClick={this.fetchUsers.bind(this)}
                    >Buscar por texto</Button>
                </Card>,
                this.formatUsers()]
    }

    /**
     * Returns the social media
     */
    getSocialMedia(){

    }

    /**
     * Sets the toggled tab
     * @param toggled The tab to be toggled
     */
    setToggled(toggled){
        this.state.toggled=toggled;
        this.setState(this.state);
    }

    /**
     * Handles the toggle
     * @returns The toggled button
     */
    handleToggle(){
        const toggleFunction = this.tabs[this.state.toggled].bind(this);
        return <Box sx={{bgcolor:"gray.medium", padding:"1em"}}>
            {toggleFunction()}
        </Box>
    }

    /**
     * Gets the posts
     */
    async fetchPosts(){
        this.state.postsList = await this.doFetchPosts();
        this.setState(this.state);
    }

    /**
     * Gets the posts from the API
     * @returns The posts
     */
    async doFetchPosts(){
        const socialMedia = this.getSocialMedia();
        let selectedProfile = this.state.profilesService.getSelectedProfile(socialMedia);
        const searchTerm = this.state.searchTerm;
        const selectedCriteria = this.state.selectedCriteria;
        let posts = [];
        if(selectedProfile==[])
            selectedProfile="";
        if(searchTerm==""){
            posts = await this.state.postsService.findDefault(socialMedia, selectedProfile);
        }else{
            if(selectedCriteria=="text"){
                posts = await this.state.postsService.findPosts(socialMedia, this.state.searchTerm, selectedProfile);
            }else if(selectedCriteria=="feed"){
                posts = await this.state.postsService.findPostsInFeed(socialMedia, this.state.searchTerm, selectedProfile);
            }else if(selectedCriteria=="user"){
                posts = await this.state.postsService.findPostsFromUser(socialMedia, this.state.searchTerm, selectedProfile);
            }
        }
        return posts;
    }


    /**
     * Gets the feeds from the API
     */
    async fetchFeeds(){
        this.state.feedsList = await this.doFetchFeeds();
        this.setState(this.state);
    }

    /**
     * Gets the feeds from the API
     * @returns The feeds from the API
     */
    async doFetchFeeds() {
        const socialMedia = this.getSocialMedia();
        const selectedProfile = this.state.profilesService.getSelectedProfile(socialMedia);
        if(this.state.feed!=undefined && this.state.feed!=""){
            return await this.state.feedsService.findFeeds(socialMedia, this.state.feed, selectedProfile);
        }
    }


    /**
     * Gets the users from the API
     */
    async fetchUsers(){
        const users = await this.doFetchUsers();
        this.state.usersList = users;
        this.setState(this.state);
    }
    /**
     * Gets the users from the API
     * @returns The users from the API
     */

    async doFetchUsers() {
        const socialMedia = this.getSocialMedia();
        const selectedProfile = this.state.profilesService.getSelectedProfile(socialMedia);
        if(this.state.user!=undefined && this.state.user!=""){
            const posts = await this.state.profilesService.findUsers(socialMedia, this.state.user, selectedProfile);
            return posts;
        }
    }

    /**
     * Handles the search term
     * @param e The change event
     */
    handleSearchTerm(e){
        this.state.searchTerm = e.target.value;
    }
    /**
     * Handles the search term
     * @param e The change event
     */
    handleSearchTermUser(e){
        this.state.user = e.target.value;
    }
    /**
     * Handles the search term
     * @param e The change event
     */
    handleSearchTermFeed(e){
        this.state.feed = e.target.value;
    }

    /**
     * Formats the posts
     * @returns The formatted posts
     */
    formatPosts(){
        const postsList = this.state.postsService.getPosts(this.getSocialMedia());
        if(postsList!=undefined){
            this.state.postsList =postsList;
            if(postsList.length>0){
                const formatedPosts = this.doFormatPosts();
                return <Box  sx={{paddingTop:"1em"}}>
                    {formatedPosts}
                </Box>;
            }
        }else{
            return <Card sx={{marginTop:"1em", padding:"1em", backgroundColor:"white"}}>No se han encontrado posts</Card>
        }

    }
    /**
     * Formats the posts
     * @returns The formatted posts
     */
    doFormatPosts(){

    }

    /**
     * Formats the title
     * @returns The title
     */
    formatTitle(){

    }
    /**
     * Formats the users
     * @returns The formatted users
     */
    formatUsers(){

        if(this.state.usersList==undefined)
            return <Card sx={{marginTop:"1em", backgroundColor:"white", padding:"1em"}}> No se han encontrado usuarios</Card>
        if(this.state.usersList.length>0){
            const formatedUsers = this.doFormatUsers();
            return <Box sx={{paddingTop:"1em"}}>
                {formatedUsers}
            </Box>;
        }
    }
    /**
     * Formats the users
     * @returns The formatted users
     */
    doFormatUsers(){

    }
    /**
     * Formats the feeds
     * @returns The formatted feeds
     */
    formatFeeds(){
        if(this.state.feedsList==undefined)
            return <Box sx={{paddingTop:"1em"}} className={"postsWithTitle"}>
                <Card sx={{backgroundColor:"white", padding:"1em"}}> No se han encontrado feeds</Card>

            </Box>;
        if(this.state.feedsList.length>0){
            const formatedFeeds = this.doFormatFeeds();
            return <Box sx={{paddingTop:"1em"}} className={"postsWithTitle"}>
                {formatedFeeds}
            </Box>;
        }
    }
    /**
     * Formats the feeds
     * @returns The formatted feeds
     */
    doFormatFeeds(){
        return <FeedList getList={this.getFeedsList.bind(this)}
                         zoom={this.state.zoomFeed}
                         parent={this}
                         redSocial={this.getSocialMedia()}
        ></FeedList>
    }

    /**
     * Renders the component
     * @returns {JSX.Element}
     */
    render(){
        return (<Card sx={{padding:"1em", marginLeft:this.marginLeft, marginRight:"1em", marginTop:"2em", maxWidth:"100%", maxHeight:"100%"}} className={"feed"} elevation={4}>
            <Typography align="center"variant={"h5"}component={"h2"}>
                {this.formatTitle()}
            </Typography>
            <Box  className={"socialMediaMain"}>
                {this.formatTabButtons()}
                {this.handleToggle()}
            </Box>
        </Card>);
    }

    /**
     * Formats the tab buttons
     * @returns The tab buttons
     */
    formatTabButtons(){
        const toggled = this.state.toggled;
        const result = this.tabNames.map((tabName) => {
            let color = {bgcolor: "accents.main", color: "accents.text"};
            if (tabName == toggled) {
                color = {bgcolor: "navbar.main", color: "navbar.text"}
            }
            return <Button id={"tabButton" + tabName} sx={color} onClick={() => {
                this.setToggled(tabName)
            }}>{tabName}</Button>

        });
        return <Box className={"mediaTabs"}>
            {result}
        </Box>
    }

    /**
     * Formats the feed name
     * @returns The feed name
     */
    doFormatFeedName() {

    }

    /**
     * Returns the posts list
     * @returns The posts list
     */
    getPostsList(){
        return this.state.postsList;
    }
    /**
     * Returns the users list
     * @returns The users list
     */
    getUsersList(){
        return this.state.usersList;
    }
    /**
     * Returns the feeds list
     * @returns The feeds list
     */
    getFeedsList(){
        return this.state.feedsList;
    }
}
export default SocialMediaMainViewComponent;

