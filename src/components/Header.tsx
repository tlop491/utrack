import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core/';

// import MenuIcon from '@material-ui/icons/Menu';

import * as React from 'react';
// import { Nav,  NavItem } from 'react-bootstrap';
// import { IndexLinkContainer } from "react-router-bootstrap";
// import { Link } from 'react-router-dom';

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
import { WithStyles } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
// import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
});

const styles = createStyles({

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    root: {
        flexGrow: 1,
    },
});

// Change header color

interface IState {
    auth: boolean,
    anchorEl: null,
}

interface IProps extends WithStyles<typeof styles> { }

export class Header extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            anchorEl: null,
            auth: true,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    public handleChange(event: any): void {
        const safeSearchTypeValue: boolean = event.target.checked;
        this.setState({ auth: safeSearchTypeValue, anchorEl: null });
    };

    public handleMenu(event: any): void {
        this.setState({ anchorEl: event.currentTarget, auth: this.state.auth });
    };

    public handleClose(event: any) {
        this.setState({ anchorEl: null });
    };

    public render() {
        const open = Boolean(this.state.anchorEl);
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch checked={this.state.auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                            }
                            label={this.state.auth ? 'Logout' : 'Login'}
                        />
                    </FormGroup>
                    <AppBar position="static">

                        <Toolbar>

            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>

                            <Typography variant="display2" color="inherit" className={classes.grow}>
                                Photos
                                     </Typography>



                            <div>
                                {this.state.auth && (
                                    <div>
                                        <IconButton
                                            aria-owns={open ? 'menu-appbar' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleMenu}
                                            color="inherit"

                                        >
                                            <AccountCircle />
                                        </IconButton>

                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={this.state.anchorEl}
                                            anchorOrigin={{
                                                horizontal: 'right',
                                                vertical: 'top',

                                            }}
                                            transformOrigin={{
                                                horizontal: 'right',
                                                vertical: 'top',

                                            }}
                                            open={open}
                                            onClose={this.handleClose}
                                        >
                                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        </Menu>
                                    </div>
                                )}
                            </div>



                        </Toolbar>

                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
