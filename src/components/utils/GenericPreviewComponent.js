import React from "react";

/**
 * Generic preview component
 */
class GenericPreviewComponent extends React.Component{

    /**
     * Constructor function
     * @param props The properties
     */
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

    /**
     * Formats the item
     * @returns The formatted item
     */
    formatItem(){
        var item = this.state.getItem(this.state.index);
        return (<section onClick={()=>{this.displayItem()}}>
            {this.doFormatItem(item)}
        </section>)
    }

    /**
     * Displays the item
     */
    displayItem(){
        this.doDisplayItem();
    }

    /**
     * Formats the item
     * @param item The item
     * @returns The formatted item
     */
    doFormatItem(item){
        return <h5>{item.name}</h5>;
    }

    /**
     * Displays the item
     */
    doDisplayItem(){

    }

    /**
     * Renders the component
     * @returns The component
     */
    render(){
        return (this.formatItem());
    }
}
export default GenericPreviewComponent;
