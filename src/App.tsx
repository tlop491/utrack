// import PdfDisplayFactory from './components/PdfDisplayFactory';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import Modal from 'react-responsive-modal';
import * as Webcam from "react-webcam";
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
  authenticated: boolean,
  splash: boolean,
  refCamera: any,
  predictionResult: any


}
export default class App extends React.Component<{}, IDispState> {


  constructor(props: any) {
    super(props)
    this.state = {
      currentDoc: { "id": 0, "title": "Is Mayonnaise an Instrument?", "url": "https://example.com/url-to-doc-img.jpg", "tags": "Compsys303", "uploaded": "11/10/2018 10:09:52 PM", "userId": "Tim", "courseName": "Compsys 303", "typeDoc": "Notes", "width": "680", "height": "680" },
      docs: [],
      open: false,
      uploadFileList: null,
      studentSubjectONE: '',
      studentSubjectTWO: '',
      studentSubjectTHREE: '',
      studentSubjectFOUR: '',
      items: [],
      // authenticated: false,
      authenticated: true,
      splash: false,
      refCamera: React.createRef(),
      predictionResult: null,
    }

    this.fetchDocs("")
    this.fetchDocsV2("")
    this.fetchDocsTags()
    this.fetchDocs = this.fetchDocs.bind(this)
    this.fetchDocsV2 = this.fetchDocsV2.bind(this)
    this.fetchDocsTags = this.fetchDocsTags.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.splashDisable = this.splashDisable.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.uploadDoc = this.uploadDoc.bind(this)
  }

  public render() {
    const { authenticated, splash, } = this.state



    return (
      <div>

        {/* Splash Screen */}

        {(!splash) ?
          <div className="splash row meme-img">
            {/* <h1>Splash Screen Test</h1> */}
            < img src="./Logo.png" />
            <div className="btn btn-primary bottom-button splashbutton" onClick={this.splashDisable}>Start</div>

          </div> : ""}


        {(!authenticated) && (splash) ?
          <Modal open={!authenticated} onClose={this.authenticate} closeOnOverlayClick={false} showCloseIcon={false} center={true}>
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              ref={this.state.refCamera}

            />
            <div className="row nav-row">
              <div className="btn btn-primary bottom-button" onClick={this.authenticate}>Login</div>
            </div>
          </Modal> : ""}

        {(authenticated) && (splash) ?
          <div>
            <Dashboard
              studentSubjectONE={this.state.studentSubjectONE}
              studentSubjectTWO={this.state.studentSubjectTWO}
              studentSubjectTHREE={this.state.studentSubjectTHREE}
              studentSubjectFOUR={this.state.studentSubjectFOUR}
              docs={this.state.docs}
              docCatergories={this.state.docCatergories}
              authenticated={this.state.authenticated}
              items={this.state.items}
            />



          </div>
          : ""}


      </div>

    );
  }

  // Authenticate
  private authenticate() {
    const screenshot = this.state.refCamera.current.getScreenshot();
    this.getFaceRecognitionResult(screenshot);
  }

  private splashDisable() {
    this.setState({
      splash: true
    })
  }




  // Call custom vision model
  private getFaceRecognitionResult(image: string) {
    const url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/0aa850be-2ca8-438f-92d6-e1c968754c40/image?iterationId=b4b6d8d7-de05-44cb-9ce8-8ec00b52f387"
    if (image === null) {
      return;
    }
    const base64 = require('base64-js');
    const base64content = image.split(";")[1].split(",")[1]
    const byteArray = base64.toByteArray(base64content);
    fetch(url, {
      body: byteArray,
      headers: {
        'cache-control': 'no-cache', 'Prediction-Key': 'e028b78b03ef405790c70c660af47454', 'Content-Type': 'application/octet-stream'
      },
      method: 'POST'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        } else {
          response.json().then((json: any) => {
            // tslint:disable-next-line:no-console
            console.log(json.predictions[0])

            this.setState({ predictionResult: json.predictions[0] })
            if (this.state.predictionResult.probability > 0.7) {
              this.setState({ authenticated: true })
            } else {
              this.setState({ authenticated: false })
              // tslint:disable-next-line:no-console
              console.log(json.predictions[0].tagName)
            }
          })
        }
      })
  }


  // GET Docs
  private fetchDocsV2(tag: any) {
    let url = "https://utrackapii.azurewebsites.net/api/DocumentItem"
    if (tag !== "") {
      url += "/tag?=" + tag
    }
    fetch(url, {
      method: 'GET'
    })
      .then(results => results.json())
      .then(results => this.setState({ 'items': results }))

  }


  // GET Docs
  private fetchDocs(tag: any) {
    let url = "https://utrackapii.azurewebsites.net/api/DocumentItem"
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
    const url = "https://utrackapii.azurewebsites.net/api/DocumentItem/tags"

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

  // Sets file list
  private handleFileUpload(fileList: any) {
    this.setState({
      uploadFileList: fileList.target.files
    })
  }

  // POST doc
  private uploadDoc() {
    const titleInput = document.getElementById("doc-title-input") as HTMLInputElement
    const tagInput = document.getElementById("doc-tag-input") as HTMLInputElement
    const coursename = document.getElementById("doc-coursename-input") as HTMLInputElement
    const userid = document.getElementById("doc-userid-input") as HTMLInputElement


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
    formData.append("Title", title)
    formData.append("Tags", tag)
    formData.append("CourseName", course)
    formData.append("UserId", id)

    fetch(url, {
      body: formData,
      headers: { 'cache-control': 'no-cache' },
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