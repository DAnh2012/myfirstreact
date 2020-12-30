/* eslint-disable no-unused-expressions */
import {  MDBRow, MDBCol, MDBBtn, MDBInput} from 'mdbreact';
//import "mdbreact/dist/css/mdb.css";
import "./index.js";
import './mdb.css';
import {  withRouter } from "react-router-dom";


import React, {Component} from 'react';



const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = '0';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: null,
      fullname:"",
      username: "",
      password:"",
      confirmPassword:"",
      needValidate: true,
      start1: false,
      start2: false,
      invalidId: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.setApi = this.setApi.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  
  redirect = () => {
    this.props.history.push('/temp');
    this.props.history.goBack();
  };

  setApi(a) {
    this.setState({res:a});
    console.log(this.state.res);
  }


  fetchData() {
    fetch(`http://webdatienloi.com:8765/api/account/register`, {
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        rePassword: this.state.password,
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

  submitHandler(event) {
    event.target.className += " was-validated";
    this.setState({start1:true, start2:true});
    event.preventDefault();
    const {username, password, confirmPassword, res} = this.state;
    (username.length !== 10) || (password.length === 0) || (confirmPassword.length === 0 || password !== confirmPassword) 
            ? event.preventDefault()  : this.fetchData(); 
    
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidUpdate() {
    if(this.state.res !== null) {
    if (this.state.res.returnCode === 1) {
      alert("Đăng ký thành công");
       this.redirect();
    }  else if (this.state.res.returnCode !== 1 && this.state.invalidId === false ) {
      this.setState({invalidId: true})
    };
  }
  }


  render() {
    let needValidate1;
    let needValidate2;

    return (
      <div className='bottom-pad'>
        <h2 style={{textAlign:"center", color:"#438bf0", paddingTop:"30px"}}>Đăng ký tài khoản</h2>
        <br/>
        <div hidden={!this.state.invalidId} style={{marginBottom:"20px"}}> 
          <p className="log-in-noti">Số điện thoại đã được sử dụng </p>
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
              {
                    this.state.username.length !== 10 ? needValidate2=true : needValidate2=false
               }
               <Validation needValidate ={needValidate2} start={this.state.start2}>Số điện thoại phải có 10 chữ số</Validation>
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
            <MDBRow>
            <MDBCol md="7" style={{left:"21%"}}>
              <MDBInput
                value={this.state.confirmPassword}
                onChange={this.changeHandler}
                type="password"
                id="materialFormRegisterPasswordEx4"
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                required
              >
              </MDBInput>
              {
                    this.state.confirmPassword !== this.state.password ? needValidate1=true : needValidate1=false
               }
              <Validation needValidate ={needValidate1} start={this.state.start1}>Mật khẩu không khớp</Validation>
            </MDBCol>
          </MDBRow>
          <br/><br/>
          <MDBBtn color="success" type="submit" style={{left:"40%"}}>
            ĐĂNG KÝ
          </MDBBtn>
        </form>
      </div>
    );
  }
}

function Validation(props) {
  const {needValidate, children, start} = props;
  return(
    <div hidden={start ? !needValidate : true}>
      <br/>
      <p style={{bottom:"6px", position:"absolute",color:"#db190b", fontSize:"81%"}}>{children}</p>
    </div> 
  )
}

export default withRouter(SignUp);