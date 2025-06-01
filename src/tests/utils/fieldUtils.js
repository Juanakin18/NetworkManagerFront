
import {fireEvent, screen} from "@testing-library/react";
import expect from "expect";

class FieldUtils{
   fillFieldByPlaceholder(placeholder,value){
       var field = screen.getByPlaceholderText(placeholder);
       expect(field).toBeInTheDocument();
       fireEvent.input(field, {target:{value:value}});
   }

    fillFieldByTestId(id,value){
        var field = screen.getByTestId(id);
        expect(field).toBeInTheDocument();
        fireEvent.input(field, {target:{value:value}});
    }

}export default FieldUtils;