import * as React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';


interface IDispState {

  currentDoc: {},
  docs: [],
  docCatergories?: any,
  open: boolean,
  uploadFileList: any,
  studentSubjectONE?: any,
  studentSubjectTWO?: any,
  studentSubjectTHREE?: any,
  studentSubjectFOUR?: any,
  items: any[],

}
export default class App extends React.Component<{}, IDispState> {


  constructor(props: any) {
    super(props)
    this.state = {
      currentDoc: { "id": 0, "title": "Is Mayonnaise an Instrument?", "url": "https://example.com/url-to-meme-img.jpg", "tags": "Compsys303", "uploaded": "11/10/2018 10:09:52 PM", "userId": "Tim", "courseName": "Compsys 303", "typeDoc": "Notes", "width": "680", "height": "680" },
      docs: [],
      open: false,
      uploadFileList: null,
      studentSubjectONE: '',
      studentSubjectTWO: '',
      studentSubjectTHREE: '',
      studentSubjectFOUR: '',
      items: [],
    }

    this.fetchDocs("")
    this.fetchDocsV2("")
    this.fetchDocsTags()
    this.fetchDocs = this.fetchDocs.bind(this)
    this.fetchDocsV2 = this.fetchDocsV2.bind(this)
    this.fetchDocsTags = this.fetchDocsTags.bind(this)
  }

  public render() {

    return (
      <div>
        <Dashboard
          studentSubjectONE={this.state.studentSubjectONE}
          studentSubjectTWO={this.state.studentSubjectTWO}
          studentSubjectTHREE={this.state.studentSubjectTHREE}
          studentSubjectFOUR={this.state.studentSubjectFOUR}
          docs={this.state.docs}
          docCatergories={this.state.docCatergories} />

          {this.state.items.map(
            (item, index) => {
            return <h1 key={index}>{item.title}</h1>;
          })}
      </div>

    );
  }


 // GET Docs
 private fetchDocsV2(tag: any) {
  let url = "https://utracker.azurewebsites.net/api/DocumentItem"
  if (tag !== "") {
    url += "/tag?=" + tag
  }
  fetch(url, {
    method: 'GET'
  })
    .then(results => results.json())
    .then(results => this.setState({'items':results}))
    // {
    //   let currentDoc = json
    //   if (currentDoc === undefined) {
    //     currentDoc = { "id": 0, "title": "No Docs", "url": "", "tags": "try a different tag", "uploaded": "", "width": "0", "height": "0" }
    //   }

    //   // tslint:disable-next-line:no-console
    //   console.log(currentDoc);


    //   this.setState({
    //     currentDoc,
    //     docs: json,
    //     // docCatergories: filteredArray,
    //   })

    //   // Loop and find based on identifier
    //   const filteredArray = Array.from(new Set(this.state.docs.map((item: any) => item.tags)))

    //   // tslint:disable-next-line:no-console
    //   console.log("Filterede Array is: " + filteredArray);

    //   this.setState({

    //     docCatergories: filteredArray,
    //   })

    //   // tslint:disable-next-line:no-console
    //   console.log("Do Catergories Array is: " + this.state.docCatergories);

    // });
}



























  // GET Docs
  private fetchDocs(tag: any) {
    let url = "https://utracker.azurewebsites.net/api/DocumentItem"
    if (tag !== "") {
      url += "/tag?=" + tag
    }
    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        let currentDoc = json
        if (currentDoc === undefined) {
          currentDoc = { "id": 0, "title": "No Docs", "url": "", "tags": "try a different tag", "uploaded": "", "width": "0", "height": "0" }
        }

        // tslint:disable-next-line:no-console
        console.log(currentDoc);


        this.setState({
          currentDoc,
          docs: json,
          // docCatergories: filteredArray,
        })

        // Loop and find based on identifier
        const filteredArray = Array.from(new Set(this.state.docs.map((item: any) => item.tags)))

        // tslint:disable-next-line:no-console
        console.log("Filterede Array is: " + filteredArray);

        this.setState({

          docCatergories: filteredArray,
        })

        // tslint:disable-next-line:no-console
        console.log("Do Catergories Array is: " + this.state.docCatergories);

      });
  }


  private fetchDocsTags() {
    const url = "https://utracker.azurewebsites.net/api/DocumentItem/tags"

    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        let currentDoc = json
        if (currentDoc === undefined) {
          currentDoc = { "id": 0, "title": "No Docs", "url": "", "tags": "try a different tag", "uploaded": "", "width": "0", "height": "0" }
        }

        // tslint:disable-next-line:no-console
        console.log(currentDoc);

        this.setState({
          studentSubjectONE: currentDoc[0],
          studentSubjectTWO: currentDoc[1],
          studentSubjectTHREE: currentDoc[2],
          studentSubjectFOUR: currentDoc[2],
        })

      });
  }

}