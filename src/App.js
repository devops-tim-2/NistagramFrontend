import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Newsfeed from './Newsfeed/Newsfeed'
import Register from './Register/Register'
import Login from './Login/Login'
import AddPost from './Post/AddPost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
      
        <Route exact path='/' component={Newsfeed}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/post' component={AddPost}/>
        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        
      </div>
    );
  }
}

export default App;