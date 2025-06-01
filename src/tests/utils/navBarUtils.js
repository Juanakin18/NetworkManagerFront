import {screen} from "@testing-library/react";
import App from "../../App";
import * as Simulate from "@testing-library/user-event/dist/click";

class NavBarUtils {
    toggleTo(text){
        const linkElement = screen.getByText(text);
        expect(linkElement).toBeInTheDocument();
        Simulate.click(linkElement);
    }
}export default NavBarUtils;