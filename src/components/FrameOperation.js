import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from 'validator';
import axios from 'axios';  

const required = (value) => {
    if (!value.toString().trim().length) {
      return(
          <span className="error">Required</span>
      );
    }
};

class FrameOperation extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            code: '',
            description:'',
            image1:'',
            image2:'',
            image3:'',
            image4:'',
            image1Name:'',
            image2Name:'',
            image3Name:'',
            image4Name:'',
            url:'',
        }
        this.createFrame = this.createFrame.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    handleChange(e){
        if(e.target.files){
            const imageState = `${e.target.name}Name`
            this.setState({
                [e.target.name]:e.target.files[0],
                [imageState]:e.target.value,
            });
        }else{
            this.setState({
                [e.target.name]:e.target.value,
            },()=>{console.log(this.state,'state')});
        }   
    }

    handleChangeImage(e){
      console.log(e,'testimage');
    }
    createFrame(){
        const formData = new FormData();
        formData.append('image1',this.state.image1);
        formData.append('image2',this.state.image2);
        formData.append('image3',this.state.image3);
        formData.append('image4',this.state.image4);
        formData.append('code',this.state.code);
        formData.append('name',this.state.name);
        formData.append('description',this.state.description);
        formData.append('url',this.state.url);

        axios.post(process.env.REACT_APP_API+'/api/createFrame', formData,{header:{
            'Content-Type': 'multipart/form-data',
        }})
        .then(res => {
            alert('Frame Created!!');
            this.props.history.push('/dashboard');
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
                            <h3 className="box-title">Add Frame</h3>
                        </div>
                        <div className="col-md-12">
                            <div className="box box-primary">
                                    <Form id="frame" method="post">
                                        <div className="box-body">
                                            <div className="form-group has-feedback">
                                                <label>Frame Name</label>
                                                <Input
                                                  type="text"
                                                  name="name"
                                                  className="form-control" 
                                                  value={this.state.name}
                                                  onChange={this.handleChange}
                                                  placeholder="Frame Name*"
                                                  validations={[required]}
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                            <div className="form-group has-feedback">
                                                <label>Frame Code</label>
                                                <Input
                                                  type="text" 
                                                  name="code" 
                                                  className="form-control" 
                                                  value={this.state.code} 
                                                  onChange={this.handleChange} 
                                                  placeholder="Frame Code*" 
                                                  validations={[required]}
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                            <div className="form-group has-feedback">
                                                <label>Frame Description</label>
                                                <Input 
                                                  type="text" 
                                                  name="description" 
                                                  className="form-control" 
                                                  value={this.state.description} 
                                                  onChange={this.handleChange} 
                                                  placeholder="Frame Description*" 
                                                  validations={[required]}
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                            <div className="form-group has-feedback">
                                                <label>Frame Image External URL</label>
                                                <Input 
                                                  type="text" 
                                                  name="url" 
                                                  className="form-control" 
                                                  value={this.state.url} 
                                                  onChange={this.handleChange} 
                                                  placeholder="Frame External URL*" 
                                                  validations={[required]}
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                            <div className="form-group has-feedback">
                                                <label>Frame Image 1</label>
                                                <Input 
                                                  type="file" 
                                                  name="image1" 
                                                  className="form-control" 
                                                  value={this.state.image1Name} 
                                                  onChange={this.handleChange} 
                                                  placeholder="Frame Image*" 
                                                  validations={[required]}
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                            <div className="form-group has-feedback">
                                                <label>Frame Image 2</label>
                                                <Input 
                                                  type="file" 
                                                  name="image2" 
                                                  className="form-control" 
                                                  value={this.state.image2Name} 
                                                  onChange={this.handleChange} 
                                                  placeholder="Frame Image*" 
                                                  validations={[required]}
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                            <div className="form-group has-feedback">
                                                <label>Frame Image 3</label>
                                                <Input 
                                                  type="file" 
                                                  name="image3" 
                                                  className="form-control" 
                                                  value={this.state.image3Name} 
                                                  onChange={this.handleChange} 
                                                  placeholder="Frame Image*" 
                                                  validations={[required]}
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                            <div className="form-group has-feedback">
                                                <label>Frame Image 4</label>
                                                <Input 
                                                  type="file" 
                                                  name="image4" 
                                                  className="form-control" 
                                                  value={this.state.image4Name} 
                                                  onChange={this.handleChange} 
                                                  placeholder="Frame Image*" 
                                                  validations={[required]}
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                             {/*<div>
                                              <Widget
                                                id="file"
                                                publicKey="023600512e719c72f047"
                                                clearable="true"
                                                name="image2"
                                                imagesOnly="true"
                                                onChange={this.handleChangeImage}
                                              />
                                            </div>
                                            <div>
                                              <Widget
                                                id="file"
                                                publicKey="023600512e719c72f047"
                                                clearable="true"
                                                name="image3"
                                                imagesOnly="true"
                                                onChange={this.handleChangeImage}
                                              />
                                            </div> */}
                                            {/* <div className="form-group"> 
                                                <label>Feedback*</label>
                                                <textarea className="form-control" name={"feedback"+i} id={"feedback"+i} type="text"></textarea>
                                            </div> */}
                                            <Button type="button" className="btn btn-primary" onClick={this.createFrame}>Submit</Button>
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
export default FrameOperation;

