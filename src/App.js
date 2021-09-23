import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import FrameOperation from './components/FrameOperation'

class App extends Component {
    constructor(){
        super();
        this.state = {
            frames: []
        }
        this.getDashboardDetails = this.getDashboardDetails.bind(this);
    }
    getDashboardDetails(res){
                this.setState({
                    frames: res
                });
    }
    render() {
        return(
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path = '/' component = {Login} />
                            <Route exact path = '/dashboard' render={(props) => (localStorage.getItem('loggedin') ? <div><Header action={this.getDashboardDetails}/><Dashboard frames={this.state.frames} /><Footer /></div> : (<Redirect to="/" />))} />
                            <Route exact path = '/addframe' render={(props) => (localStorage.getItem('loggedin') ? <div><Header action={this.getDashboardDetails}/><FrameOperation /><Footer /></div> : (<Redirect to="/" />))} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
export default App;