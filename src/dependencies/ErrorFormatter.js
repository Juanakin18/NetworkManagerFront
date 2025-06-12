import {Box, Card, List, ListItem, Typography} from "@mui/material";

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
            return <Box></Box>
        else {

            return <List sx={{width:"100%"}}>
                {errorsProperty.map((error)=>{
                    return this.formatErrors(error);
                })}
            </List>;
        }
    }
    formatErrors(error){
        console.log(error)
        return <ListItem sx={{width:"100%"}}><Card><Typography  sx={{color:"error.text", backgroundColor:"error.main", padding:"1em", width:"100%"}}>{error}</Typography></Card></ListItem>;
    }

}
export default ErrorHandler;