// import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Document, Page } from 'react-pdf';
import '../App.css';



interface IDispState {

    numPages: any,
    pageNumber: any,


}

export default class PdfDisplayFactor extends React.Component<{ url: string, title: string, category: string, date: string, }, IDispState> {

    constructor(props: any) {
        super(props);

        this.state = {
            numPages: null,
            pageNumber: 1,

        };

        this.onDocumentLoad = this.onDocumentLoad.bind(this);



    }


    public onDocumentLoad({ numPages }: any) {
        this.setState({ numPages });
    };



    public render() {
        const { pageNumber, numPages } = this.state;
        const extension = this.props.url;

        if (extension === 'pdf') {
            return (
                <div >
                    <h3>{this.props.title}</h3>
                    <h4>{this.props.category}</h4>
                    <h5>{this.props.date}</h5>

                    <Document
                        //   file={this.props.url}
                        file="https://msaphase2blob.blob.core.windows.net/images/f4d4690e-d249-424f-b765-54bccb03e1e1.pdf"
                        onLoadSuccess={this.onDocumentLoad}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>
                </div>
            )
        }
        else {
            return <div className="row meme-img">
                <h3>{this.props.title}</h3>
                <h4>{this.props.category}</h4>
                <h5>{this.props.date}</h5>
                <img src={this.props.url} />
            </div>
        }


        // return (
        //     <div >
        //         <h3>{this.props.title}</h3>
        //         <h4>{this.props.category}</h4>
        //         <h5>{this.props.date}</h5>

        //         <Document
        //             //   file={this.props.url}
        //             file="https://msaphase2blob.blob.core.windows.net/images/f4d4690e-d249-424f-b765-54bccb03e1e1.pdf"
        //             onLoadSuccess={this.onDocumentLoad}
        //         >
        //             <Page pageNumber={pageNumber} />
        //         </Document>
        //         <p>Page {pageNumber} of {numPages}</p>
        //     </div>
        // );
    }
}




