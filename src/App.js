import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Newsfeed from './Newsfeed/Newsfeed'
import Register from './Register/Register'
import Login from './Login/Login'
import AddPost from './Post/AddPost';
import AddCampaign from './Campaign/AddCampaign';
import PostPage from './Post/PostPage';
import CampaignPage from './Campaign/CampaignPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Requests from './Profile/Requests';
import BottomBar from './BottomBar/BottomBar';
import Profile from './Profile/Profile';
import Update from './Register/Update';
import Favorites from './Profile/Favorites';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
      
        <Route exact path='/' component={Newsfeed}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/update' component={Update}/>
        <Route exact path='/post' component={AddPost}/>
        <Route exact path='/campaign' component={AddCampaign}/>
        <Route exact path='/profile/:user_id' component={Profile}/>
        <Route exact path='/post/:post_id' component={PostPage}/>
        <Route exact path='/campaign/:campaign_id' component={CampaignPage}/>
        <Route exact path='/requests' component={Requests}/>
        <Route exact path='/favorites' component={Favorites}/>
        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        
        <BottomBar></BottomBar>
      </div>
    );
  }
}

export default App;