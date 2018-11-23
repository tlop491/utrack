import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App'
// import Dashboard from './components/Dashboard';
import FirstComponent from './components/FirstComponent';
import PdfDisplayFactory from './components/PdfDisplayFactory';
// import  Header  from './components/Header';
import SecondComponent from './components/SecondComponent';
import './css/styles.css';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                {/* <Header /> */}
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/FirstComponent" component={FirstComponent} />
                    <Route path="/PdfDisplayFactory" component={PdfDisplayFactory} />
                    <Route path="/SecondComponent" component={SecondComponent} />
                    <Redirect from='*' to='/' />
                </main>
            </div>
        </BrowserRouter>

    );
}
