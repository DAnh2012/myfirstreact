/* eslint-disable no-unused-expressions */

import React from 'react';
import './App.css';
import {LogIn, SignUp} from '../Forms';
import Popup from "reactjs-popup";
import {TextField, FormControl, Button} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import {   MDBBtn} from 'mdbreact';


  
const price = [
[0, "Dưới 1 triệu"], [1, "1-3 triệu"],[2, "3-5 triệu"],[3, "5-10 triệu"],[4, "+10 triệu"]
];

const rentalType = [
[0,"Phòng trọ"], [1,"Chung cư mini"], [2,"Nhà nguyên căn"], [3,"Chung cư nguyên căn"]
];

const size = [
  [0,"Dưới 20m2"], [1,"20 - 35m2"], [2,"35 - 50m2"], [3,"Trên 50m2"]
]

function Area(props) {
  return (
    <Autocomplete
      id="area" 
      onChange={props.onChange}
      options={props.location}
      getOptionLabel={(option) => option[1]}
      style={{ width: 270 }}
      renderInput={(params) => <TextField {...params} label="Khu vực" 
      InputLabelProps= {{ style: { marginLeft: '10px'}}} style={{background:"white", borderRight:"solid 1px"}}/>}
    />
  );
}

function Price(props) {
  return (
    <Autocomplete
    onChange={props.onChange}
      options={price}
      getOptionLabel={(option) => option[1]}
      defaultValue = {price.find(v => v[0])}
      style={{ width: 270 }}
      renderInput={(params) => <TextField id="price" {...params} label="Mức giá (*)" 
      InputLabelProps= {{ style: { marginLeft: '10px'}}} style={{background:"white", borderRight:"solid 1px"}}/>}
    />
  );
}

function RentalType(props) {
  return (
    <Autocomplete
    onChange={props.onChange}
      options={rentalType}
      getOptionLabel={(option) => option[1]}
      style={{ width: 270 }}
      renderInput={(params) => <TextField id="rentalType" {...params} label="Loại thuê"
      InputLabelProps= {{ style: { marginLeft: '10px'}}} style={{background:"white", borderRight:"solid 1px"}}/>}
    />
  );
}

function Size(props) {
  return (
    <Autocomplete
    onChange={props.onChange}
      options={size}
      getOptionLabel={(option) => option[1]}
      style={{ width: 270 }}
      renderInput={(params) => <TextField id="size" {...params} label="Kích thước" 
      InputLabelProps= {{ style: { marginLeft: '10px'}}} style={{background:"white", borderRight:"solid 1px"}}/>}
    />
  );
}

class NavBar extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        location: null,
        searchTerm: '',
        openPopup: true,
        isLogin: localStorage.getItem('isLogin'),
        area: null,
        price: null,
        rentalType: null,
        size: null,
        postId: null,
        result: null

      }
      this.onSearchChange = this.onSearchChange.bind(this);
      this.togglePopup = this.togglePopup.bind(this);
      this.onLogOut = this.onLogOut.bind(this);
      this.fetchData = this.fetchData.bind(this);
      this.onSearchSumbit = this.onSearchSumbit.bind(this);
      this.updateParent = this.updateParent.bind(this);
    }
  
    togglePopup() {
      this.setState({openPopup: !this.state.openPopup})
    }

    onSearchChange(event) {
      this.setState({ searchTerm: event.target.value});
    }

    onLogOut() {
      localStorage.setItem('isLogin', false)
      this.setState({isLogin: false});
    }

    fetchData() {
      fetch(`http://webdatienloi.com:8765/api/api-location/list`, {
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        
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
      this.setState({location:a});
    }


    componentDidMount() {
      this.fetchData()
    }

    //componentDidUpdate() {
     // if(this.state.location !== null) {
      //  console.log(this.state.location)
     //}
   // }

    areaHandler = (event, value) => {
      if (value !== null) {
      this.setState({ area: value[0] }, () => console.log(this.state.area));
      
      }
    };

    priceHandler = (event, value) => {
      if (value !== null) {
      this.setState({ price: value[0] }, () => console.log(this.state.price));
      }
    };

    typeHandler = (event, value) => {
      if (value !== null) {
      this.setState({ rentalType: value[0] }, () => console.log(this.state.rentalType));
      }
    };

    sizeHandler = (event, value) => {
      if (value !== null) {
      this.setState({ size: value[0] }, () => console.log(this.state.size));
      
      }
    };

    searchPost() {
      fetch(`http://webdatienloi.com:8765/api/post/filter/list`, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          postID: this.state.searchTerm,
          typeRoom: this.state.rentalType,
          locationId: this.state.area,
          priceRoom: this.state.price,
          area: this.state.size
        })  
      }
      )
      .then(response => response.json())
      .then(res => this.setApi2(res) )
      .catch(error => {
        console.error('Error:', error);
      });
      //console.log(this.state.res);
    }

    setApi2(a) {
      this.setState({result:a}, () => this.props.update1(this.state.result));
      
      //console.log(this.state.result)
    }

    onSearchSumbit(event) {
      this.searchPost();
      
      event.preventDefault(); 
    }

    updateParent = () =>
    {
      this.props.update1(this.state.result);
    };

    render() {
      if(this.state.location === null) {return null}

      return(
      <div className="nav-bar  ">
             { localStorage.getItem('isLogin') === 'true' 
             ? <div className="w3-border-bottom  nav-bar-2 ">
                <Link to='/'>
                  <button className=" w3-button w3-left w3-border-right button1"  style = {{color:'black', outline:'none'}}
                  >Motel</button>
                </Link> 
                <div className="dropdown w3-right">
                  <button className="dropbtn">
                    <div className = 'w3-right user'  >
                      {localStorage.getItem('userId')}
                    </div>
                  <div className = 'user-icon w3-right'> 
                    <PersonOutlineOutlinedIcon />
                  </div></button>
                  <div class="dropdown-content">
                    { /* <button onClick={this.onLogOut} className='logout-button'>
                      Đăng xuất
                      </button> */ }
                      
                      <MDBBtn color="success" style={{height:'80%'}} onClick={this.onLogOut} >
                        Đăng xuất

                      </MDBBtn>

                  </div>
                </div>
               
                
              </div>
             
             :
                <div className="w3-border-bottom  nav-bar-2 ">
                  <Link to='/'>
                    <button className=" w3-button w3-left w3-border-right button1"  style = {{color:'black'}}
                    >Motel</button>
                  </Link>

                   <Popup modal 
                    trigger={
                    <button className=" w3-button w3-right w3-border-left button1" >
                      Đăng ký
                    </button>}>
                    <div><SignUp popup = {this.togglePopup}/></div>
                  </Popup>
                  
                  <Popup modal 
                    trigger={
                    <button className=" w3-button w3-right w3-border-left button1" >
                      Đăng nhập
                    </button>}>
                    <div><LogIn/></div>
                  </Popup> 
                </div> }
                
                <div className="w3-card nav-bar-1" >   
                <form onSubmit={this.onSearchSumbit}>
                <FormControl >
                  <RentalType onChange={this.typeHandler} />   
                </FormControl>
                <FormControl>
                  <Area  location={this.state.location.data} onChange={this.areaHandler}/>
                </FormControl>
                <FormControl required={true}>
                  <Price onChange={this.priceHandler} />
                </FormControl>
                <FormControl>
                  <Size onChange={this.sizeHandler} />
                </FormControl>
                
                <Button variant="contained" color="primary" style={{outline:'none', height:'35px', margin:'5px 0 0 10px'}}
                  type='submit' 
                >
                  Tìm kiếm
                </Button>
                </form>
  
                </div>
        </div>  
      ) 
      }
  }

  export default NavBar;