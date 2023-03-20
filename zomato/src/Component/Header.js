import React from "react";
import Button from "react-bootstrap/Button";
import './Styles/Header.css';
import {GoogleLogin} from 'react-google-login';
import Modal from 'react-modal';
import {loadGapiInsideDOM} from'gapi-script'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "lavenderblush",
      border: "solid 2px lightpink",
      boxShadow: "3px 3px 3px 3px lightpink"
    },
  };

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            backgroundColor: '',
            display: "none",
            loginInModalisOpen:false,
            isLoggedIn:false,
            loggedInUser:undefined,
            CreateAccountisOpen:false,
        }
    }

    componentDidMount() {
        const path = this.props.history.location.pathname;
        this.setAttributes(path);
        (async () => {
            await loadGapiInsideDOM();
          })()
    }
    setAttributes = (path) => {
        let bg, display;
        if (path == '/') {
            bg = "rgba(122, 75, 31, 0.341)";
            display = 'none';
        } else {
            bg = "rgba(122, 75, 31, 0.341)";
            display = "inline-block";
        }
        this.setState({ backgroundColor: bg, display: display });
    }

    handleLogin=()=>{
        this.setState({loginInModalisOpen:true})
    }

    handleCancel=()=>{
        this.setState({loginInModalisOpen:false})
    }
    handleCreate=()=>{
       this.setState({CreateAccountisOpen:true})
    }
    handleCreateCancel=()=>{
        this.setState({CreateAccountisOpen:false})
    }
    responseGoogle = (response) => {
        this.setState({isLoggedIn:true,loggedInUser:response.profileObj.name,loginInModalisOpen:false,CreateAccountisOpen:false});
        // this.setState({response})
    }

    handlelogout=()=>{
        this.setState({isLoggedIn:false,loggedInUser:undefined})
    }

    navigate=(path)=>{this.props.history.push(path)}

    render() {
        const { backgroundColor, display,loginInModalisOpen,CreateAccountisOpen,isLoggedIn,loggedInUser } = this.state;
        return (
            <div className="header" style={{ backgroundColor: backgroundColor}}>
                <div className="header-logo" style={{ display: display }} onClick={()=>this.navigate('/')}>
                    <p>e!</p>
                </div>
                {!isLoggedIn ?
                <span className="user-account">
                    <Button variant="danger" onClick={this.handleLogin}>Login</Button>
                    <Button variant="danger" onClick={this.handleCreate}>create an account</Button>
                </span>
             :
                <div className="user-account">
                    <Button variant="danger">{loggedInUser}</Button>
                    <Button variant="danger"onClick={this.handlelogout}>Logout</Button>
                </div>
                }
                <Modal
        isOpen={loginInModalisOpen}
        style={customStyles}
        ariaHideApp={false}
        
        >
        <div>
            <h2>Login</h2>
            <input type='text' placeholder="Email"/><br/><br/>
            {/* <input type='Password' placeholder="Password"/> */}
            <div>
            <Button variant="danger">login</Button>
            <Button variant="danger" onClick={this.handleCancel}>Cancel</Button>
            <GoogleLogin
    clientId="739425664927-gbvas4c4ko34rpl4g5m6hn78tte9khec.apps.googleusercontent.com"
    buttonText="Continue with Google"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
     />
            </div>
                 </div>
        </Modal>
        <Modal
        isOpen={CreateAccountisOpen}
        style={customStyles}
        ariaHideApp={false}
>
            <div>
            <h2>Register</h2>
            <input type='text' placeholder="Email"/><br/><br/>
            <input type='Password' placeholder="Password"/>
            <div>
            <Button variant="danger">Register</Button>
            <Button variant="danger" onClick={this.handleCreateCancel}>Cancel</Button>
            </div>
            <br/>
            <div>
            <Button variant="primary"><i className='fa fa-facebook'style={{'color':"darkblue"}}></i> Continue with FaceBook</Button>
            <br/>
           
            <GoogleLogin
    clientId="739425664927-gbvas4c4ko34rpl4g5m6hn78tte9khec.apps.googleusercontent.com"
    buttonText="Continue with Google"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
     />
            </div>
       </div>
        </Modal>
            </div>

        )
    }
}

export default Header;