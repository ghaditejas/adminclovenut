import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import FrameOperation from './components/FrameOperation';
import FrameEdit from './components/FrameEdit';
import Category from './components/Category';
import CategoryAdd from './components/CategoryAdd';
import CategoryEdit from './components/CategoryEdit';
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
                            <Route exact path = '/dashboard' render={(props) => (localStorage.getItem('loggedin') ? <div><Header action={this.getDashboardDetails} {...props}/><Dashboard frames={this.state.frames} {...props} /><Footer /></div> : (<Redirect to="/" />))} />
                            <Route exact path = '/addframe' render={(props) => (localStorage.getItem('loggedin') ? <div><Header action={this.getDashboardDetails} {...props}/><FrameOperation   {...props} /><Footer /></div> : (<Redirect to="/" />))} />
                            <Route exact path = '/editframe/:id' render={(props) => (localStorage.getItem('loggedin') ? <div><Header action={this.getDashboardDetails} {...props}/><FrameEdit   {...props} /><Footer /></div> : (<Redirect to="/" />))} />
                            <Route exact path = '/category' render={(props) => (localStorage.getItem('loggedin') ? <div><Header action={this.getDashboardDetails} {...props}/><Category frames={this.state.frames} {...props} /><Footer /></div> : (<Redirect to="/" />))} />
                            <Route exact path = '/addFrameCategory' render={(props) => (localStorage.getItem('loggedin') ? <div><Header action={this.getDashboardDetails} {...props}/><CategoryAdd   {...props} /><Footer /></div> : (<Redirect to="/" />))} />
                            <Route exact path = '/editFrameCateogry/:id' render={(props) => (localStorage.getItem('loggedin') ? <div><Header action={this.getDashboardDetails} {...props}/><CategoryEdit   {...props} /><Footer /></div> : (<Redirect to="/" />))} />

                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
export default App;