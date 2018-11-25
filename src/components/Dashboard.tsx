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
import ChatBot from 'react-simple-chatbot';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from 'react-responsive-modal';
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
    button: {
        margin: theme.spacing.unit,
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
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 6,
        right: theme.spacing.unit * 6,
    },
    fabUpdate: {
        position: 'absolute',
        bottom: theme.spacing.unit * 14,
        right: theme.spacing.unit * 6,
    },
    fabChat: {
        position: 'absolute',
        bottom: theme.spacing.unit * 22,
        right: theme.spacing.unit * 6,
    }
});

interface IState {
    auth: boolean,
    anchorEl: null,
    authenticated: boolean,
    open: boolean,
    openM: boolean,
    openD: boolean,
    openChat: boolean,
    uploadFileList: any,
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
            openM: false,
            uploadFileList: null,
            openD: false,
            openChat: false,
        };

        // this.renderDocs = this.renderDocs.bind(this);
        // this.renderSquare = this.renderSquare.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.uploadMeme = this.uploadMeme.bind(this)


    }

    public handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    public handleDrawerClose = () => {
        this.setState({ open: false });
    };

    public handleMenu(event: any): void {
        this.setState({ anchorEl: event.currentTarget, auth: this.state.auth, authenticated: this.state.authenticated });
    }
    public handleChange(event: any): void {
        const safeSearchTypeValue: boolean = event.target.checked;
        this.setState({ auth: safeSearchTypeValue, authenticated: safeSearchTypeValue, anchorEl: null });
    }


    public handleClose(event: any) {
        this.setState({ anchorEl: null });
    }
    public handleLogout(event: any) {
        const safeSearchTypeValue: boolean = event.target.checked;
        this.setState({ auth: safeSearchTypeValue, anchorEl: null });
    }

    // public renderSquare(url: any, title: any, category: any, date: any) {
    //     // return <PdfDisplayFactory url="https://msaphase2blob.blob.core.windows.net/images/f4d4690e-d249-424f-b765-54bccb03e1e1.pdf" title="Sometitle" category="Some Catergory"  date="10/10/10" />;

    //     return <PdfDisplayFactory url="https://github.com/tlop491/partIV-106/blob/master/Minutes/Meeting_Minutes_160818.pdfs" title={title} category={category} date={date} id= />;

    // }




    public render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);
        const { openM, openD, openChat } = this.state;


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

                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />


                    <Typography component="div" className={classes.chartContainer}>
                        {/* <SimpleLineChart /> */}
                    </Typography>




                    {this.props.items.map(
                        (item, index) => {
                            return <div key={index} className="docHolder">
                                <PdfDisplayFactory url={item.url} title={item.title} category={item.category} date={item.date} id={item.id} />
                                {/* <Button variant="outlined" className={classes.button} onClick={this.onDelete}>
                                    Delete
                                </Button>
                                <Button variant="outlined" className={classes.button}>
                                    Update
                                </Button> */}
                                {/* This dot id: {item.id} */}
                            </div>


                        })}




                    <Button variant="fab" color="primary" aria-label="Add" className={classes.fabChat} onClick={this.onChatOpenModal}>
                        <ChatIcon />
                    </Button>

                    <Button variant="fab" color="primary" aria-label="Add" className={classes.fabUpdate} onClick={this.onUpdateOpenModal}>
                        <DeleteIcon />
                    </Button>


                    <Button variant="fab" color="primary" aria-label="Add" className={classes.fab} onClick={this.onOpenModal}>
                        <AddIcon />
                    </Button>

                    <Modal open={openM} onClose={this.onCloseModal}>
                        <form>
                            <div className="form-group">
                                <label>UserID</label>
                                <input type="text" className="form-control" id="meme-userid-input" placeholder="Enter Title" />
                                <small className="form-text text-muted">You can edit any  later</small>
                            </div>

                            <div className="form-group">
                                <label>Coursename</label>
                                <input type="text" className="form-control" id="meme-coursename-input" placeholder="Enter Tag" />
                                <small className="form-text text-muted">Couse Name</small>
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" id="meme-title-input" placeholder="Title Name" />
                                <small className="form-text text-muted">Title</small>
                            </div>

                            <div className="form-group">
                                <label>Tags</label>
                                <input type="text" className="form-control" id="meme-tags-input" placeholder="Enter Tag" />
                                <small className="form-text text-muted">Tag is used for search</small>
                            </div>

                            <div className="form-group">
                                <label>Image</label>
                                <input type="file" onChange={this.handleFileUpload} className="form-control-file" id="meme-image-input" />
                            </div>

                            <button type="button" className="btn" onClick={this.uploadMeme}>Upload</button>
                        </form>
                    </Modal>

                    <Modal open={openD} onClose={this.onUpdateCloseModal}>
                        <form>
                            <div className="form-group">
                                <label>UserID</label>
                                <input type="text" className="form-control" id="meme-userid-input" placeholder="Enter Title" />
                                <small className="form-text text-muted">You can edit any later</small>
                            </div>

                            <button type="button" className="btn" onClick={this.onDelete}>Upload</button>
                        </form>
                    </Modal>

                    <Modal open={openChat} onClose={this.onChatCloseModal}>
                        <ChatBot
                            steps={[
                                {
                                    id: 'hello-world',
                                    message: 'Hello World! I am a chatbot but currently I am at mechanics. MSPs please help, give me job! Send Location! SEND LOCATION!!',
                                    end: true,
                                },
                            ]}
                        />
                    </Modal>



                    <div className={classes.tableContainer}>
                        {/* <SimpleTable /> */}
                    </div>
                </main>
            </div>
        );
    }


    // Modal open
    private onOpenModal = () => {
        this.setState({ openM: true });
    };

    // Modal close
    private onCloseModal = () => {
        this.setState({ openM: false });
    };

    // Modal open
    private onUpdateOpenModal = () => {
        this.setState({ openD: true });
    };

    // Modal close
    private onUpdateCloseModal = () => {
        this.setState({ openD: false });
    };

    // Modal open
    private onChatOpenModal = () => {
        this.setState({ openChat: true });
    };

    // Modal close
    private onChatCloseModal = () => {
        this.setState({ openChat: false });
    };


    private onDelete() {
        // const titleInput = document.getElementById("meme-title-input") as HTMLInputElement
        // const tagInput = document.getElementById("meme-tags-input") as HTMLInputElement
        // const coursename = document.getElementById("meme-coursename-input") as HTMLInputElement
        const userid = document.getElementById("meme-userid-input") as HTMLInputElement


        // const imageFile = this.state.uploadFileList[0]

        if (userid === null) {
            return;
        }

        const id = userid.value
        const url = "https://utrackapii.azurewebsites.net/api/DocumentItem/" + id





        fetch(url, {
            headers: { 'cache-control': 'no-cache', },
            method: 'DELETE'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText)
                } else {
                    location.reload()
                }
            })
    }


    // Sets file list
    private handleFileUpload(fileList: any) {
        this.setState({
            uploadFileList: fileList.target.files
        })
    }

    // POST meme
    private uploadMeme() {
        const titleInput = document.getElementById("meme-title-input") as HTMLInputElement
        const tagInput = document.getElementById("meme-tags-input") as HTMLInputElement
        const coursename = document.getElementById("meme-coursename-input") as HTMLInputElement
        const userid = document.getElementById("meme-userid-input") as HTMLInputElement


        const imageFile = this.state.uploadFileList[0]

        if (titleInput === null || tagInput === null || imageFile === null || coursename === null || userid === null) {
            return;
        }

        const title = titleInput.value
        const tag = tagInput.value
        const course = coursename.value
        const id = userid.value
        const url = "https://utrackapii.azurewebsites.net/api/DocumentItem/upload"

        const formData = new FormData()
        formData.append("UserId", id)
        formData.append("CourseName", course)
        formData.append("Title", title)
        formData.append("Tags", tag)
        formData.append("image", imageFile)



        fetch(url, {
            body: formData,
            headers: { 'cache-control': 'no-cache', },
            method: 'POST'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText)
                } else {
                    location.reload()
                }
            })
    }
}

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Dashboard);