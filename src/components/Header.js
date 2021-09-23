import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.UserLogout = this.UserLogout.bind(this);
    }
    UserLogout(){
        localStorage.clear();
    }
    componentDidMount(){   

        if(localStorage.getItem('loggedin')){
            axios.get(process.env.REACT_APP_API+'/api/getFrames', { headers: { Authorization: localStorage.getItem('token') } }).then(res => {
                this.props.action(res.data);
            })
            .catch((error) => {
                alert('error ' + error);
            });
        }else{
            this.props.history.push('/');
        }

    }
    render() {
        return(
            <div>
            <header className="main-header">
                <a href="javascript:void(0)" className="logo">
                    <span className="logo-lg"><b>Clovenut</b>Admin</span>
                </a>
                <nav className="navbar navbar-static-top">
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                                    <span className="hidden-xs">Sainty Thomas</span>
                                </a>
                            </li>
                            <li className="pull-right">
                            <a href="#" onClick={this.UserLogout}><i className="fa fa-sign-out"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className="treeview">
                        <Link to="/dashboard" >
                            <i className="fa fa-dashboard"></i> 
                            <span>Dashboard</span>
                        </Link>
                        </li>
                        <li className="treeview">
                        <Link to="/addframe" >
                            <i className="fa fa-user"></i> 
                            <span>Add Feedback</span>
                        </Link>
                        </li>
                    </ul>
                </section>                
            </aside>
            </div>
        );
    }
}
export default Header;

