import React from "react";
class CommentSubmitFormComponent extends React.Component{

    constructor(props) {
        super();
    }
    render(){
        return <section>
            <h3>Responder al hilo</h3>
            <textarea name="text" id="" cols="30" rows="10"></textarea>
            <button>Mandar</button>
        </section>;
    }
}
export default CommentSubmitFormComponent;