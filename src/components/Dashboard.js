import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.deleteFrame = this.deleteFrame.bind(this);
        this.addFrame = this.addFrame.bind(this);
        this.editFrame = this.editFrame.bind(this);
    }

    addFrame(){
        this.props.history.push('/addframe');
    }

    editFrame(code){
        this.props.history.push(`/editFrame/${code}`);
    }
    deleteFrame(code){
        axios.post(process.env.REACT_APP_API+'/api/deleteFrame', {code})
        .then(res => {
            alert('Frame Deleted!!');
            window.location.reload();
        })
        .catch((error) => {
            alert('error ' + error);
        });
    }

    render() {
        console.log(this.props.frames);
        return(
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Frames
                    </h1>
                </section>
                <section className="content">
                    <button onClick={this.addFrame} type="button" className="add-frame-btn btn btn-block btn-primary btn-lg">Add Frame</button>
                    <div className="col-sm-12">
                    <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                        <th>ID</th>
                        <th>Frame Name</th>
                        <th>Frame Code</th>
                        <th>Frame Description</th>
                        <th>Frame Image</th>
                        <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.props.frames.map((frame,index) => (
                    <tr key={`frame-${index}`}>
                        <td>{index+1}</td>
                        <td>{frame.Frame_Name}</td>
                        <td>{frame.Frame_Code}</td>
                        <td>{frame.Frame_Description	}</td>
                        <td><img style={{width:'200px'}}src={frame.Frame_External_Link} alt="frame"/></td>
                        <td>
                            <div onClick={()=>this.deleteFrame(frame.id)} className="frame-delete">
                            {" "}
                                <i className="fa fa-trash-o"></i>
                            </div>
                            <div onClick={()=>this.editFrame(frame.id)} className="frame-delete">
                            {" "}
                                <i className="fa fa-pencil-square-o"></i>
                            </div>
                        </td>
                    </tr>
                 ))} 
                 </tbody>
                </table>
              </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default Dashboard;