
import {fireEvent, screen, within} from "@testing-library/react";
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
    fillAutoCompleteByTestID(id, value){
        var field = screen.getByTestId(id);
        const input = within(field).getByRole('combobox')
        expect(field).toBeInTheDocument();
        fireEvent.change(input, {target:{value:value}});
    }

}export default FieldUtils;