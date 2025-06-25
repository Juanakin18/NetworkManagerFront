import React,{useState, useEffect} from "react";
class GenericPreviewComponent extends React.Component{

    constructor(props) {
        super();
        this.state = {
            item:props.item,
            zoom:props.zoom,
            parent: props.parent,
            index: props.index,
            getItem: props.getItem
        }
    }

    formatItem(){
        var item = this.state.getItem(this.state.index);
        return (<section onClick={()=>{this.displayItem()}}>
            {this.doFormatItem(item)}
        </section>)
    }

    displayItem(){
        this.doDisplayItem();
    }

    doFormatItem(item){
        return <h5>{item.name}</h5>;
    }

    doDisplayItem(){

    }

    render(){
        return (this.formatItem());
    }
}
export default GenericPreviewComponent;
