// import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Document, Page } from 'react-pdf';
import '../App.css';



  interface IDispState {

    numPages: any,
    pageNumber: any,
    
  
  }

export default class PdfDisplayFactor extends React.Component<{url: string, title: string, category: string, date: string,}, IDispState> {

    constructor(props: any) {
        super(props);

        this.state = {
            numPages: null,
            pageNumber: 1,

        };

        this.onDocumentLoad = this.onDocumentLoad.bind(this);
        
        

    }


    public onDocumentLoad({numPages}:any) {
        this.setState({numPages}, );
      };

    

  public render() {
    const { pageNumber, numPages } = this.state;    
 
    return (
      <div>
         <h1>{this.props.title}</h1>
         <h2>{this.props.category}</h2>
         <h2>{this.props.date}</h2>   
        <Document
          file={this.props.url}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}



 
