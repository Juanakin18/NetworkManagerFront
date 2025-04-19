import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Toolbar, Typography
} from "@mui/material";
import React from "react";

function NavBarComponent(props){



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NetworkManager
                    </Typography>
                    <Button color="inherit" >Login</Button>
                    <Button color="inherit" >Registrarse</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBarComponent;