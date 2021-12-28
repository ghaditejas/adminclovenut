import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Select from 'react-validation/build/select';
import axios from 'axios';  

const required = (value) => {
    if (!value.toString().trim().length) {
      return(
          <span className="error">Required</span>
      );
    }
};

class FrameEdit extends Component {
    constructor(props){
        super(props);
        console.log(props,'propsssss');
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
            frameCategory:[],
            category:'',
        }
        this.createFrame = this.createFrame.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    componentDidMount(){
      axios.get(process.env.REACT_APP_API+'/api/getFrameCategory')
          .then(res => {
              this.setState({
                frameCategory : res.data
              },()=>console.log(this.state.frameCategory,'checkinngggg'))
          })
          .catch((error) => {
              alert('error ' + error);
          });
      if(this.props.match.params.id){
        axios.post(process.env.REACT_APP_API+'/api/getDefaultFrame',{frameCode:this.props.match.params.id})
        .then((response) => {
          console.log(response,'response')
          this.setState(
            {
              name: response.data[0]['Frame_Name'],
              code: response.data[0]['Frame_Code'],
              description: response.data[0]['Frame_Description'],
              url: response.data[0]['Frame_External_Link'],
              category: response.data[0]['Frame_Category'],
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
        formData.append('category',this.state.category);
        axios.post(process.env.REACT_APP_API+`/api/editFrame/${this.props.match.params.id}`, formData,{header:{
            'Content-Type': 'multipart/form-data',
        }})
        .then(res => {
            alert('Frame Edited!!');
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
                                                />
                                                <span className="form-control-feedback"></span>
                                            </div>
                                            <div className="form-group has-feedback">
                                                <label>Frame Category</label>
                                                <Select 
                                                  type="file" 
                                                  name="category" 
                                                  className="form-control" 
                                                  value={this.state.category} 
                                                  onChange={this.handleChange} 
                                                  placeholder="Frame Category" 
                                                  validations={[required]}
                                                >
                                                    <option value="">Select Category</option>
                                                    {this.state.frameCategory.length && this.state.frameCategory.map(frameCategory => 
                                                    <option value={frameCategory.id}>{frameCategory.Category}</option>)
                                                    }
                                                </Select>
                                            </div>
                                            <Button type="button" className="btn btn-primary" onClick={this.createFrame}>Submit</Button>
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
export default FrameEdit;

