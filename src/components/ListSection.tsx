// import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClassIcon from '@material-ui/icons/Class';
import LayersIcon from '@material-ui/icons/Layers';
import * as React from 'react';


import '../App.css';




export default class ListSection extends React.Component<{ studentSubjectONE: string, studentSubjectTWO: string, studentSubjectTHREE: string, studentSubjectFOUR: string, docCatergories: any[],},{}> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }
    
  public render() {    
 
    return (
      <div>
        {/* <Document
          file={this.props.url}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p> */}


                        <List>
                            <div>
                <ListItem button={true}>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.studentSubjectONE} />
                </ListItem>
                <ListItem button={true}>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.studentSubjectTWO}/>
                </ListItem>
                <ListItem button={true}>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText primary= {this.props.studentSubjectTHREE}/>
                </ListItem>
                <ListItem button={true}>
                <ListItemIcon>
                    <ClassIcon />
                   </ListItemIcon>
                <ListItemText primary={this.props.studentSubjectFOUR} />
                </ListItem>
                <ListItem button={true}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
                </ListItem>
            </div>

                </List>
      </div>
    );
  }
}



 
