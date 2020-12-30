import {  MDBRow, MDBCol, MDBBtn,MDBInput } from 'mdbreact';
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import './mdb.css';
import React from 'react';
import {  withRouter } from "react-router-dom";


class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: null,
      username: "",
      password:"",
      start: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }
  
  fetchData() {
    fetch(`http://webdatienloi.com:8765/api/account/login`, {
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })  
    }
    )
    .then(response => response.json())
    .then(res => this.setApi(res) )
    .catch(error => {
      console.error('Error:', error);
    });
    //console.log(this.state.res);
  }

  setApi(a) {
    this.setState({res:a});
    console.log(this.state.res);
  }

  redirect = () => {
    this.props.history.push('/temp');
    this.props.history.goBack();
  };

  submitHandler = event => {
    event.target.className += " was-validated";
    //this.setState({start:true});
    event.preventDefault(); 
    const {username, password, confirmPassword, res} = this.state;
    this.fetchData();

  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidUpdate() {
    if(this.state.res !== null) {
    if (this.state.res.returnCode === 1) {
      localStorage.setItem('isLogin', true);
      localStorage.setItem('userId', this.state.username)
      this.redirect();
    }  else if (this.state.res.returnCode !== 1 && this.state.start === false ) {
      this.setState({start: true})
    };
  }
  }

  render() {
    return (
      <div className = 'bottom-pad'>
        <h2 style={{textAlign:"center", color:"#438bf0", paddingTop:"30px"}}>Đăng nhập</h2>
        <br/>
        <div hidden={!this.state.start} style={{marginBottom:"20px"}}> 
          <p className="log-in-noti">Số điện thoại hoặc mật khẩu không chính xác</p>
        </div>
        
        <form
          className="needs-validation"
          onSubmit={ this.submitHandler}
          noValidate
        >
          <MDBRow>
          <MDBCol md="7" style={{left:"21%"}}>
              <MDBInput
                value={this.state.username}
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterConfirmEx3"
                name="username"
                label="Số điện thoại"
                required
              >
              <div className="invalid-feedback">
                  Số điện thoại không được bỏ trống
              </div>
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="7" style={{left:"21%"}}>
              <MDBInput
                value={this.state.password}
                onChange={this.changeHandler}
                type="password"
                id="materialFormRegisterPasswordEx3"
                name="password"
                label="Mật khẩu"
                required
              >
                <div className="invalid-feedback">
                  Mật khẩu không được bỏ trống
                </div>

              </MDBInput>
            </MDBCol>
            </MDBRow>
          <br/><br/>
          
          <MDBBtn color="success" type="submit" style={{left:"38%"}}>
            ĐĂNG NHẬP
          </MDBBtn>

        </form>
      </div>
    );
  }
}


export default withRouter(LogIn);