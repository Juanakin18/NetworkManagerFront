import {Box, Card, List, ListItem, Typography} from "@mui/material";

/**
 * The error formatter
 */
class ErrorHandler{
    /**
     * Constructor function
     */
    constructor() {
        this.errors={};
    }

    /**
     * Sets the errors
     * @param errors The errors
     */
    setErrors(errors){
        this.errors=errors;
    }

    /**
     * Gets the errors
     * @returns The error map
     */
    getErrors(){
        return this.errors;
    }

    /**
     * Flushes the errors
     */
    flushErrors(){
        this.setErrors({});
    }

    /**
     * Handles the error codes
     * @param property The property
     * @returns The formatted error
     */
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

    /**
     * Formats all the errors
     * @param error The errors
     * @returns The formatted errors list
     */
    formatErrors(error){
        return <ListItem sx={{width:"100%"}}><Card><Typography  sx={{color:"error.text", backgroundColor:"error.main", padding:"1em", width:"100%"}}>{error}</Typography></Card></ListItem>;
    }

}
export default ErrorHandler;