import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';


const Navbar = () => {
    return (

        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    Task Manager
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Sign Up
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Log In
                </Button>
                <Button color="inherit" component={Link} to="/create-task">
                    Create Task
                </Button>
                <Button color="inherit" component={Link} to="/tasks">
                    Display Tasks
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
