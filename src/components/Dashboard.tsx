import { WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
// import Badge from '@material-ui/core/Badge';
import { blue, pink } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import BarChartIcon from '@material-ui/icons/BarChart';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ClassIcon from '@material-ui/icons/Class';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import LayersIcon from '@material-ui/icons/Layers';
import MenuIcon from '@material-ui/icons/Menu';
// import PeopleIcon from '@material-ui/icons/People';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import classNames from 'classnames';
import * as React from 'react';
// import ChatBot from 'react-simple-chatbot';

import FBButton from './FBButton';
import PdfDisplayFactory from './PdfDisplayFactory';







// import SimpleLineChart from './SimpleLineChart';
// import SimpleTable from './SimpleTable';
import { createMuiTheme, } from '@material-ui/core/styles';
import { secondaryListItems } from './listItems';
import ListSection from './ListSection';


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
    logoimg: {
        width: 80,
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
    authenticated: boolean,
    open: boolean,
}

interface IProps extends WithStyles<typeof styles> {
    studentSubjectONE: string,
    studentSubjectTWO: string,
    studentSubjectTHREE: string,
    studentSubjectFOUR: string,
    items: any[],
    docs: {},
    docCatergories: any[],


}

export class Dashboard extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            open: true,
            anchorEl: null,
            auth: true,
            authenticated: false,
        };

        // this.renderDocs = this.renderDocs.bind(this);
        this.renderSquare = this.renderSquare.bind(this);
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
        this.setState({ anchorEl: event.currentTarget, auth: this.state.auth, authenticated: this.state.authenticated });
    };

    public handleChange(event: any): void {
        const safeSearchTypeValue: boolean = event.target.checked;
        this.setState({ auth: safeSearchTypeValue, authenticated: safeSearchTypeValue, anchorEl: null });
    };



    public handleClose(event: any) {
        this.setState({ anchorEl: null });
    };

    public handleLogout(event: any) {
        const safeSearchTypeValue: boolean = event.target.checked;
        this.setState({ auth: safeSearchTypeValue, anchorEl: null });
    };


    public renderSquare(url: any, title: any, category: any, date: any) {
        // return <PdfDisplayFactory url="https://msaphase2blob.blob.core.windows.net/images/f4d4690e-d249-424f-b765-54bccb03e1e1.pdf" title="Sometitle" category="Some Catergory"  date="10/10/10" />;

        return <PdfDisplayFactory url="https://github.com/tlop491/partIV-106/blob/master/Minutes/Meeting_Minutes_160818.pdfs" title={title} category={category} date={date} />;

    }


    public render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);

        // const listItems = this.props.docs.map((id) =>
        //     // tslint:disable-next-line:jsx-key
        //     <PdfDisplayFactory url={this.props.docs[id].url} title={this.props.docs[id].title} category={this.props.docs[id].category}  date={this.props.docs[id].}/>
        //     );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)} >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}>
                            <MenuIcon />
                        </IconButton>
                        < img className={classNames(classes.logoimg)} src="./Logo_inverse.png" />
                        <Typography component="h1" variant="h6" color="inherit" noWrap={true} className={classes.title} >

                            U-Track: University Management Software
                         </Typography>
                        <FBButton />

                        {this.state.auth && (
                            <div>
                                <IconButton aria-owns={open ? 'menu-appbar' : undefined} aria-haspopup="true" onClick={this.handleMenu} color="inherit">
                                    <AccountCircle />
                                </IconButton>
                                <Menu id="menu-appbar" anchorEl={this.state.anchorEl} anchorOrigin={{ horizontal: 'right', vertical: 'top', }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top', }}
                                    open={open}
                                    onClose={this.handleClose}>
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
                                </Menu>
                            </div>
                        )}

                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" classes={{
                    paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                }} open={this.state.open} >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />

                    {this.props.items.map(
                        (item, index) => {
                            return <div key={index} className="docHolder">
                                {/* <PdfDisplayFactory url={item.url} title={item.title} category={item.category} date={item.date} /> */}
                                <ListSection studentSubjectONE={item.courseName} studentSubjectTWO={this.props.studentSubjectTWO} studentSubjectTHREE={this.props.studentSubjectTHREE} studentSubjectFOUR={this.props.studentSubjectFOUR} docCatergories={this.props.docCatergories} />
                            </div>


                        })}



                    <Divider />
                    <List>{secondaryListItems}</List>
                    {/* <FBButton /> */}
                    <div className="g_chat">
                        {/* <ChatBot
                        steps={[
                            {
                                id: 'hello-world',
                                message: 'Hello World!',
                                end: true,
                            },
                        ]}
                    /> */}

                        {/* <ChatBot
                            steps={[
                                {
                                    id: '1',
                                    message: 'What is your name?',
                                    trigger: '2',
                                },
                                {
                                    id: '2',
                                    user: true,
                                    trigger: '3',
                                },
                                {
                                    id: '3',
                                    message: 'Hi, nice to meet you!',
                                    end: true,
                                },
                            ]
                        }

                        /> */}
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />


                    <Typography component="div" className={classes.chartContainer}>
                        {/* <SimpleLineChart /> */}
                    </Typography>




                    {this.props.items.map(
                        (item, index) => {
                            return <div key={index} className="docHolder">
                                <PdfDisplayFactory url={item.url} title={item.title} category={item.category} date={item.date} />
                            </div>


                        })}



  







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