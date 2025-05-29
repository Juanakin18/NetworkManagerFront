import {List, ListItem, Typography} from "@mui/material";

class ErrorHandler{
    constructor() {
        this.errors={};
    }
    setErrors(errors){
        this.errors=errors;
    }
    getErrors(){
        return this.errors;
    }
    flushErrors(){
        this.setErrors({});
    }
     handleErrorCodes(property){
        var errors = this.getErrors();
        if(errors ==undefined)
            this.setErrors([])
        var errorsProperty = errors[property];
        if (errorsProperty == undefined){
            errors[property]=[];
            errorsProperty = errors[property];
        }
        if(errorsProperty==undefined)
            return <Typography></Typography>
        else {

            return <List>
                {errorsProperty.map((error)=>{
                    return this.formatErrors(error);
                })}
            </List>;
        }
    }
    formatErrors(error){
        console.log(error)
        return <ListItem><Typography>{error}</Typography></ListItem>;
    }

}
export default ErrorHandler;