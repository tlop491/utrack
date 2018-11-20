import { WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

// import Badge from '@material-ui/core/Badge';
import { blue, pink } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import classNames from 'classnames';
import * as React from 'react';




// import SimpleLineChart from './SimpleLineChart';
// import SimpleTable from './SimpleTable';
import { createMuiTheme, } from '@material-ui/core/styles';
import { mainListItems, secondaryListItems } from './listItems';


const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
});

const styles = createStyles({

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        alignItems: 'center',

        display: 'flex',

        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },


    title: {
        flexGrow: 1,
    },


    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

interface IState {
    auth: boolean,
    anchorEl: null,

    open: boolean,
}

interface IProps extends WithStyles<typeof styles> { }

export class Dashboard extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            open: true,
            anchorEl: null,
            auth: true,
        };

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }

    public handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    public handleDrawerClose = () => {
        this.setState({ open: false });
    };

    public handleMenu(event: any): void {
        this.setState({ anchorEl: event.currentTarget, auth: this.state.auth });
    };

    public handleChange(event: any): void {
        const safeSearchTypeValue: boolean = event.target.checked;
        this.setState({ auth: safeSearchTypeValue, anchorEl: null });
    };



    public handleClose(event: any) {
        this.setState({ anchorEl: null });
    };

    public handleLogout(event: any) {
        const safeSearchTypeValue: boolean = event.target.checked;
        this.setState({ auth: safeSearchTypeValue, anchorEl: null });
    };


    public render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);


        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap={true}
                            className={classes.title}
                        >
                            Dashboard
                </Typography>

                        {/*  Icon Login  */}
                        {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
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
                            <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
                        </Menu>
                        </div>
                        )}
                            
                    </Toolbar>
                </AppBar>
                
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Typography variant="h4" gutterBottom={true} component="h2">
                        Orders
          </Typography>
                    <Typography component="div" className={classes.chartContainer}>
                        {/* <SimpleLineChart /> */}
                    </Typography>
                    <Typography variant="h4" gutterBottom={true} component="h2">
                        Products
          </Typography>
                    <div className={classes.tableContainer}>
                        {/* <SimpleTable /> */}
                    </div>
                </main>
            </div>
        );
    }
}

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Dashboard);