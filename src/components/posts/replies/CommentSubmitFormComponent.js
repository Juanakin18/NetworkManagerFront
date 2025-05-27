import React from "react";
import {Card, Typography, Input, Button} from "@mui/material";
class CommentSubmitFormComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            replyFunction:props.replyFunction,
            content:""
        }
    }
    render(){
        return <Card sx={{padding:"1em"}}elevation={4}>
            <Typography  variant={"h5"}component={"h3"}>Responder</Typography>
            <Input type={"textarea"} name="text" id="" cols="30" rows="10" onInput={this.handleText.bind(this)}></Input>
            {this.handleMandar()}
        </Card>;
    }

    handleMandar(){
        if(this.state.content.length<=0)
            return <div></div>
        else
            return <Button sx={{bgColor:"accents.main", color:"text.main"}} onClick={this.reply.bind(this)}>Responder</Button>
    }

    handleText(e){
        this.state.content = e.target.value;
        this.setState(this.state);
    }

    async reply(){
        var content = this.state.content;
        await this.state.replyFunction(content);
    }
}
export default CommentSubmitFormComponent;