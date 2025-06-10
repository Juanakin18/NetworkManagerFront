import React,{useState, useEffect} from "react";
import FeedList from "../feeds/FeedList";
import {Box, Button, Card, FormLabel, Input, Typography, RadioGroup, Radio, FormControlLabel} from "@mui/material";
class SocialMediaMainViewComponent extends React.Component{

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
    }

    formatFeedsTab(){
        return [<Card sx={{bgcolor:"white",padding:"1em"}} className={"searchBar"}>
                    <FormLabel>
                        Buscar {this.doFormatFeedName()}
                    </FormLabel>
                    <Input id={"searchTerm"}type={"text"} onInput={this.handleSearchTermFeed.bind(this)}/>
                    <Button id={"searchButton"} sx={{bgcolor:"accents.main", color:"accents.text"}}onClick={this.fetchFeeds.bind(this)}>Buscar por texto</Button>

            </Card>,
                this.formatFeeds()]

    }
    formatFeedSearch(){
        return[<FormLabel>
            Buscar {this.doFormatFeedName()}
        </FormLabel>,
            <Input type={"text"} onInput={this.handleSearchTermFeed.bind(this)}/>];
    }

    formatPostsTab(){
        return [<Card  sx={{bgcolor:"white",padding:"1em", display:"flex",flexDirection:"column"}} className={"searchTerms"}>
            <Box>
                <FormLabel>
                    Término a buscar
                </FormLabel>
                <Input  id={"searchTerm"} sx={{marginLeft:"1em"}} type={"text"} onInput={this.handleSearchTerm.bind(this)}/>
            </Box>
            {this.formatSelectFilter()}
            <Button id={"searchButton"}  sx={{bgcolor:"accents.main", color:"accents.text"}}onClick={this.fetchPosts.bind(this)}>Buscar</Button>

                </Card>,
               this.formatPosts()
                ]
    }

    formatSelectFilter(){
        var buttons = this.postCriteria.map((criteria)=>{
            return   <FormControlLabel value={criteria.id}
                                       id={"criteria"+criteria.id}
                                       control={<Radio />}
                                       label={criteria.text} />

        });
        return <FormLabel>
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

    handleSearchFilter(event){
        var value = event.target.value;
        this.state.selectedCriteria = value;
    }

    formatUsersTab(){
            return  [<Card  sx={{bgcolor:"white",padding:"1em"}}className={"searchTerms"}>
                    <FormLabel>
                        Usuario a buscar
                    </FormLabel>
                    <Input  id={"searchTerm"}type={"text"} onInput={this.handleSearchTermUser.bind(this)}/>
                    <Button id={"searchButton"}
                        sx={{bgcolor:"accents.main", color:"accents.text"}}
                        onClick={this.fetchUsers.bind(this)}
                    >Buscar por texto</Button>
                </Card>,
                this.formatUsers()]
    }

    getSocialMedia(){

    }

    setToggled(toggled){
        this.state.toggled=toggled;
        this.setState(this.state);
    }

    handleToggle(){
        var toggleFunction = this.tabs[this.state.toggled].bind(this);
        return <Box sx={{bgcolor:"gray.medium", padding:"1em"}}>
            {toggleFunction()}
        </Box>
    }
    async fetchPosts(){
        var posts = await this.doFetchPosts();
        this.state.postsList = posts;
        this.setState(this.state);
    }
    async doFetchPosts(){
        var socialMedia = this.getSocialMedia();
        var selectedProfile = this.state.profilesService.getSelectedProfile(socialMedia);
        var searchTerm = this.state.searchTerm;
        var selectedCriteria = this.state.selectedCriteria;
        var posts=[]
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



    async fetchFeeds(){
        var feeds = await this.doFetchFeeds();
        this.state.feedsList = feeds;
        this.setState(this.state);
    }

    async doFetchFeeds() {
        var socialMedia = this.getSocialMedia();
        var selectedProfile = this.state.profilesService.getSelectedProfile(socialMedia);
        if(this.state.feed!=undefined && this.state.feed!=""){
            var posts = await this.state.feedsService.findFeeds(socialMedia, this.state.feed, selectedProfile);
            return posts;
        }
    }



    async fetchUsers(){
        var users = await this.doFetchUsers();
        this.state.usersList = users;
        this.setState(this.state);
    }

    async doFetchUsers() {
        var socialMedia = this.getSocialMedia();
        var selectedProfile = this.state.profilesService.getSelectedProfile(socialMedia);
        if(this.state.user!=undefined && this.state.user!=""){
            var posts = await this.state.profilesService.findUsers(socialMedia, this.state.user, selectedProfile);
            return posts;
        }
    }

    handleSearchTerm(e){
        this.state.searchTerm = e.target.value;
    }

    handleSearchTermUser(e){
        this.state.user = e.target.value;
    }
    handleSearchTermFeed(e){
        this.state.feed = e.target.value;
    }

    formatPosts(){
        if(this.state.postsList.length>0){
            var formatedPosts = this.doFormatPosts();
            return <Box  sx={{paddingTop:"1em"}}>
                {formatedPosts}
            </Box>;
        }
    }

    doFormatPosts(){

    }

    formatTitle(){

    }

    formatUsers(){
        if(this.state.usersList==undefined)
            return <Card sx={{backgroundColor:"white"}}> No se han encontrado usuarios</Card>
        if(this.state.usersList.length>0){
            var formatedUsers = this.doFormatUsers();
            return <Box sx={{paddingTop:"1em"}}>
                {formatedUsers}
            </Box>;
        }
    }

    doFormatUsers(){

    }

    formatFeeds(){
        if(this.state.feedsList==undefined)
            return <Box sx={{paddingTop:"1em"}} className={"postsWithTitle"}>
                <Card sx={{backgroundColor:"white"}}> No hay feeds</Card>

            </Box>;
        if(this.state.feedsList.length>0){
            var formatedFeeds = this.doFormatFeeds();
            return <Box sx={{paddingTop:"1em"}} className={"postsWithTitle"}>
                {formatedFeeds}
            </Box>;
        }
    }

    doFormatFeeds(){
        return <FeedList getList={this.getFeedsList.bind(this)}
                         zoom={this.state.zoomFeed}
                         parent={this}
                         redSocial={this.getSocialMedia()}
        ></FeedList>
    }

    render(){
        return (<Card sx={{padding:"2em", margin:"2em", maxWidth:"100%", maxHeight:"100%"}} className={"feed"} elevation={4}>
            <Typography align="center"variant={"h5"}component={"h2"}>
                {this.formatTitle()}
            </Typography>
            <Box  className={"socialMediaMain"}>
                {this.formatTabButtons()}
                {this.handleToggle()}
            </Box>
        </Card>);
    }

    formatTabButtons(){
        var toggled = this.state.toggled;
        var result= this.tabNames.map((tabName)=>{
            var color = {bgcolor:"accents.main", color:"accents.text"};
            if(tabName==toggled){
                color={bgcolor:"navbar.main", color:"navbar.text"}
            }
            return <Button id={"tabButton"+tabName}sx={color} onClick={()=>{this.setToggled(tabName)}}>{tabName}</Button>

        })
        return <Box className={"mediaTabs"}>
            {result}
        </Box>
    }

    doFormatFeedName() {

    }
    getPostsList(){
        return this.state.postsList;
    }
    getUsersList(){
        return this.state.usersList;
    }

    getFeedsList(){
        return this.state.feedsList;
    }
}
export default SocialMediaMainViewComponent;

