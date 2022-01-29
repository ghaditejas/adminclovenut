import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.UserLogout = this.UserLogout.bind(this);
    }
    UserLogout(){
        localStorage.clear();
        this.props.history.push('/');
    }
    // componentDidMount(){   

    //     if(localStorage.getItem('loggedin')){
    //         axios.get(process.env.REACT_APP_API+'/api/getFrames', { headers: { Authorization: localStorage.getItem('token') } }).then(res => {
    //             this.props.action(res.data);
    //         })
    //         .catch((error) => {
    //             alert('error ' + error);
    //         });
    //     }else{
    //         this.props.history.push('/');
    //     }

    // }
    render() {
        return(
            <div>
            <header className="main-header">
                <span className="logo">
                    <span className="logo-lg"><b>Picframe</b>Admin</span>
                </span>
                <nav className="navbar navbar-static-top">
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <span className="dropdown-toggle" data-toggle="dropdown">
                                    <span className="hidden-xs">Sainty Thomas</span>
                                </span>
                            </li>
                            <li className="pull-right">
                            <span onClick={this.UserLogout}><i className="fa fa-sign-out"></i></span>
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
                        <Link to="/category" >
                            <i className="fa fa-list-alt"></i> 
                            <span>Category</span>
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

