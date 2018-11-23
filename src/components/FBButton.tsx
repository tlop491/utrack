
import * as React from 'react';
import FacebookLogin from 'react-facebook-login';


import '../App.css';




export default class FBButton extends React.Component<{}, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isLoggedIn: false, 
            userMediaRequested: '',
            userID: '',
            name: '',
            email: '',
            picture: '',
        };
    }
    

    public componentClicked = () => {
        // tslint:disable-next-line:no-console
        console.log('clicked');
    }

    public responseFacebook = (response:any)  => {
      // tslint:disable-next-line:no-console
        console.log(response);
        this.setState({
            isLoggedIn: true, 
            userID: response.userId,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
        });
    }
  public render() {    
        let fbContent; 

        if(this.state.isLoggedIn){

            fbContent = (
                <div style={{
                    width: '100px',
                    margin: '0', 
                    background: '#4152b3',
                    padding: '10px'

                }}> <img src={this.state.picture} alt={this.state.name} /></div>
            ); 
        } else {
            fbContent = (<FacebookLogin
            appId="2224505477821945"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />)
        }

    return (
        <div>
            {fbContent}
        </div>
    );
  }
}



 
