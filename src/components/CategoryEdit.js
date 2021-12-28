import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import axios from 'axios';  

const required = (value) => {
    if (!value.toString().trim().length) {
      return(
          <span className="error">Required</span>
      );
    }
};

class CategoryEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
          category: '',
        }
        this.createFrameCategory = this.createFrameCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      if(this.props.match.params.id){
        axios.post(process.env.REACT_APP_API+'/api/getFrameCategoryById',{categoryId:this.props.match.params.id})
        .then((response) => {
          console.log(response,'response')
          this.setState(
            {
              category: response.data[0]['Category'],
            }
          );
        })
        .catch((error) => {
          console.log(error, "error");
          this.props.history.push('/dashboard');
        });
      }else{
        this.props.history.push('/');
      }
    }

    handleChange(e){
      this.setState({
          [e.target.name]:e.target.value,
      });
    }

    createFrameCategory(){
        axios.post(process.env.REACT_APP_API+`/api/editFrameCategory/${this.props.match.params.id}`, {category: this.state.category})
        .then(res => {
            alert('Frame Category Edit!!');
            this.props.history.push('/category');
        })
        .catch((error) => {
            alert('error ' + error);
        });
    }

    render() {
        return(
            <div className="col-sm-12">
                <section className="add_fb_content content">
                    <div className="row">
                        <div className="box-header with-border">
                            <h3 className="box-title">Add Frame Category</h3>
                        </div>
                        <div className="col-md-12">
                            <div className="box box-primary">
                                    <Form id="frame" method="post">
                                        <div className="box-body">
                                            <div className="form-group has-feedback">
                                                <label>Frame Category</label>
                                                <Input
                                                  type="text"
                                                  name="category"
                                                  className="form-control" 
                                                  value={this.state.category}
                                                  onChange={this.handleChange}
                                                  placeholder="Frame Category*"
                                                  validations={[required]}
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                            <Button type="button" className="btn btn-primary" onClick={this.createFrameCategory}>Submit</Button>
                                            <button type="button" className="btn btn-primary" style={{marginLeft:'5px'}} onClick={()=>this.props.history.push('/dashboard')}>Cancel</button>
                                        </div>
                                    </Form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default CategoryEdit;

