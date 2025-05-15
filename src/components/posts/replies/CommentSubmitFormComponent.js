import React from "react";
class CommentSubmitFormComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            replyFunction:props.replyFunction,
            content:""
        }
    }
    render(){
        return <section>
            <h3>Responder al hilo</h3>
            <textarea name="text" id="" cols="30" rows="10" onInput={this.handleText.bind(this)}></textarea>
            {this.handleMandar()}
        </section>;
    }

    handleMandar(){
        if(this.state.content.length<=0)
            return <div></div>
        else
            return <button onClick={this.reply.bind(this)}>Responder</button>
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