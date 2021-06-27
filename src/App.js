import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Newsfeed from './Newsfeed/Newsfeed'
import Register from './Register/Register'
import Login from './Login/Login'
import AddPost from './Post/AddPost';
import PostPage from './Post/PostPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Requests from './Profile/Requests';
import Profile from './Profile/Profile';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
      
        <Route exact path='/' component={Newsfeed}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/post' component={AddPost}/>
        <Route exact path='/profile/:user_id' component={Profile}/>
        <Route exact path='/post/:post_id' component={PostPage}/>
        <Route exact path='/requests' component={Requests}/>
        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        
      </div>
    );
  }
}

export default App;