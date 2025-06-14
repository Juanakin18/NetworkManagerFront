import React from "react";
import {Card, Typography, Input, Button} from "@mui/material";
class CommentSubmitFormComponent extends React.Component{

    constructor(props) {
        super(props);
        var isComment = props.isComment;
        if(isComment==undefined)
            isComment=false;
        this.state={
            replyFunction:props.replyFunction,
            content:"",
            isComment:isComment,
            profilesService:props.profilesService,
            socialMedia:props.socialMedia,
            index:props.index
        }
    }
    render(){
        var id = this.state.isComment ? "commentReplyContentField"+this.state.index : "replyContentField";
        return <Card sx={{display:"flex", flexDirection:"column", padding:"1em"}}elevation={4}>
            <Typography  variant={"h5"}component={"h3"}>Responder</Typography>
            <Input className={id}type={"textarea"} name="text" id={id} cols="30" rows="10" onInput={this.handleText.bind(this)}></Input>
            {this.handleMandar()}
        </Card>;
    }

    handleMandar(){
        var id = this.state.isComment ? "commentReplyConfirmButton"+this.state.index : "replyConfirmButton";

        if(this.state.profilesService==undefined){
            return <Typography>Tienes que seleccionar un perfil de {this.state.socialMedia} para responder</Typography>

        }
        var selectedProfile = this.state.profilesService.getSelectedProfile(this.state.socialMedia);
        if(this.state.content.length<=0)
            return <div></div>
        else if(selectedProfile==""){
                return <Typography>Tienes que seleccionar un perfil de {this.state.socialMedia} para responder</Typography>
        } else
            return <Button id={id} sx={{backgroundColor:"accents.main", color:"text.main"}} onClick={this.reply.bind(this)}>Responder</Button>
    }

    handleText(e){
        this.state.content = e.target.value;
        this.setState(this.state);
    }

    async reply(){
        var content = this.state.content;
        await this.state.replyFunction(content);
        this.setState(this.state);
    }
}
export default CommentSubmitFormComponent;