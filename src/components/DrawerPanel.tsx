// import { Typography } from '@material-ui/core/';

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
import { createMuiTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';



import { withStyles } from '@material-ui/core/styles';

import { createStyles } from '@material-ui/core/styles';



const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
});


const styles = createStyles({

      appBar: {
        marginLeft: drawerWidth,

        width: `calc(100% - ${drawerWidth}px)`,
      },
      content: {
        backgroundColor: theme.palette.background.default,

        flexGrow: 1,
        padding: theme.spacing.unit * 3,
      },
      drawer: {
        flexShrink: 0,
        width: drawerWidth,
        
      },
      drawerPaper: {
        width: drawerWidth,
      },
      toolbar: theme.mixins.toolbar,

      root: {
        display: 'flex',
      },
    });

// Change header color




interface IState {
    auth: boolean,
    anchorEl: null,
}

interface IProps extends WithStyles<typeof styles> { }

export class DrawerPanel extends React.Component<IProps, IState> {

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
        // const open = Boolean(this.state.anchorEl);
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <CssBaseline />
            {/* <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" color="inherit" noWrap={true}>
                  Permanent drawer
                </Typography>
              </Toolbar>
            </AppBar> */}
            
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="left"
            >
              <div className={classes.toolbar} />
              <Divider />
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button={true} key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button={true} key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {/* <Typography paragraph={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
              </Typography>
              <Typography paragraph={true}>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
              </Typography> */}
            </main>
          </div>
        );
    }
}

export default withStyles(styles)(DrawerPanel);
