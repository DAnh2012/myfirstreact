import React, {Component, useState} from 'react';
import './App.css';
import 'reactjs-popup/dist/index.css';
import Search from './Search';
import {FormPage} from './Forms';
import MenuItem from './MenuItem';
import Loading from 'react-loading-animation';
import NavBar from './NavBar';
import Button from './Button';



const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = '0';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };

    this.setApi = this.setApi.bind(this);    
    this.onUpdateResult= this.onUpdateResult.bind(this);
  }

/*  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
    results: {
    ...results,
    [searchKey]: { hits: updatedHits, page }
    }
    });
  }

  needsToSearchTopstories(searchTerm) {
    return this.state.results ?
    !this.state.results[searchTerm] : true;
     
  }

  setSearchTopstories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
      const updatedHits = [
      ...oldHits,
      ...hits
      ];
    this.setState({
        results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
        }
      });
    }

  fetchSearchTopstories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    .then(response => response.json())
    .then(result => console.log(result));
    } 

  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopstories(searchTerm)) {
      this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
      } 
    event.preventDefault();
  }
*/
  componentDidMount() {
    //const { searchTerm } = this.state;
    //this.setState({ searchKey: searchTerm });
    fetch('http://webdatienloi.com:8765/api/post/list', {
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then(response => response.json())
    .then(result => this.setApi(result));
    }

  setApi(a) {
    this.setState({results:a}, () => console.log(this.state.results));
  }

  onUpdateResult(a) {
    
    this.setState({results:a}, () => console.log(this.state.results))
    
  }

  render() {
  /*  const {
      searchTerm,
      results,
      searchKey
      } = this.state;
      const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
      ) || 0;
      const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
      ) || [];  */

    const {  results } = this.state;
    if (!results) {return null;}

    return (
        
        <div className="App">
           <NavBar update1={this.onUpdateResult} />

          <br/><br/>
          <br/><br/>
          
          <div><MenuItem cards={results.data}  /> </div>
          

          <br/> <br/>

        </div>
      );
  }
}

 

const Table = ({ list,  onDismiss }) => 

        <div>
          { list.map(item =>
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title} </a>
              </span>
              <span>{item.author }</span>
              <span>{item.num_comments} </span>
              <span>{item.points} </span>
              <span>
              <button
                onClick={() => onDismiss(item.objectID)}
                type="button"
              >
              Dismiss
              </button>
              </span>
            </div>
          )}
        </div>
      
 



/* class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username:"",
      password:"",
      confirmPassword:"",
      fullName:"",
      email:"",
      //database:db,
    }
    
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }


  render() {
    return (
  
      <form className="sign-up-form" onSubmit>
                        <h2 id="sign-up-title" style={{color:"blue"}}>Đăng ký tài khoản </h2>
                        <div >
                            <input  maxlength="64" name="username" placeholder = "Tên đăng nhập"
                            type="text" value={this.state.username} onChange = { this.onInputChange} required/>
                            <span style={{color:"red", padding:"5px"}}>*</span>
                        </div>
                        <div >
                            <input  maxlength="64" name="email" placeholder="Địa chỉ email"
                            type="email" value={this.state.email} onChange={this.onInputChange} required />
                            <span style={{color:"red", padding:"5px"}}>*</span>
                        </div>
                        <div >
                            <input  maxlength="64" name="password" placeholder="Mật khẩu"
                            type="password" value={this.state.password} onChange={this.onInputChange} required/>
                            <span style={{color:"red", padding:"5px"}}>*</span>
                        </div>
                        <div >
                            <input  maxlength="64" name="confirmPassword" placeholder="Nhập lại mật khẩu"
                            type="password" value={this.confirmPassword} onChange={this.onInputChange} required/>
                            <span style={{color:"red", padding:"5px"}}>*</span>
                        </div>
                        <div >
                            <input  maxlength="64" name="fullName" placeholder="Tên đầy đủ" 
                            type="text" value={this.fullName} onChange={this.onInputChange}/>
                            
                        </div>
                        
                        <div id="gender">
                          <input type="radio" id="nam" value="nam" name="gender"/>
                          <label for="nam" style={{paddingRight:"50px"}}>Nam</label>
                          <input type="radio" id="nu" value="nu" name="gender"/>
                          <label for="nu">Nữ</label>
                        </div>
                        <div>
                          <input type="submit" value="Đăng ký" />
                        </div>
                      </form>
    )
  }
}
*/


export default App;
