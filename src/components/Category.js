import React, { Component } from 'react';
import axios from 'axios';

class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
          frameCategory:[],
        }
        this.deleteFrameCategory = this.deleteFrameCategory.bind(this);
        this.addFrameCategory = this.addFrameCategory.bind(this);
        this.editFrameCategory = this.editFrameCategory.bind(this);
    }

    addFrameCategory(){
        this.props.history.push('/addFrameCategory');
    }

    editFrameCategory(categoryId){
        this.props.history.push(`/editFrameCateogry/${categoryId}`);
    }

    deleteFrameCategory(categoryId){
        axios.post(process.env.REACT_APP_API+'/api/deleteFrameCategory', {categoryId})
        .then(res => {
            alert('Frame Category Deleted!!');
            window.location.reload();
        })
        .catch((error) => {
            alert('error ' + error);
        });
    }

    componentDidMount(){
      axios.get(process.env.REACT_APP_API+'/api/getFrameCategory')
        .then(res => {
            this.setState({
              frameCategory : res.data
            })
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
                        Frame Category
                    </h1>
                </section>
                <section className="content">
                    <button onClick={this.addFrameCategory} type="button" className="add-frame-btn btn btn-block btn-primary btn-lg">Add Frame Category</button>
                    <div className="col-sm-12">
                    <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                        <th>ID</th>
                        <th>Frame Category</th>
                        <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.frameCategory.map((frameCategory,index) => (
                    <tr key={`frame-${index}`}>
                        <td>{frameCategory.id}</td>
                        <td>{frameCategory.Category}</td>
                        <td>
                            <div onClick={()=>this.deleteFrameCategory(frameCategory.id)} className="frame-delete">
                            {" "}
                                <i className="fa fa-trash-o"></i>
                            </div>
                            <div onClick={()=>this.editFrameCategory(frameCategory.id)} className="frame-delete">
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
export default Category;