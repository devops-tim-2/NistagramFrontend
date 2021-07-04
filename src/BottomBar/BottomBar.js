
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../Services/userService';

class BottomBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        refresh: 0
      };
    }
    async componentDidMount() {
      userService.onChange = (v) => this.setState({refresh: v});
    }
  
  
    render() {
        return localStorage.getItem('identity')?(
            <nav className="navbar fixed-bottom col-12 bg-white border-top">
                <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-12">
                    <Link className="btn btn-outline-dark offset-1 col-2 dam" to="/">
                        <i className="damm fas fa-home fa-2x"></i>
                    </Link>
                    <Link className="btn btn-outline-dark col-2 dam" to="/">
                        <i className="damm fas fa-search fa-2x"></i>
                    </Link>
                    <Link className="btn btn-outline-success col-2 dam" to="/post">
                        <i className="damm fas fa-plus-square fa-2x"></i>
                    </Link>
                    <Link className="btn btn-outline-dark col-2 dam" to="/favorites">
                        <i className="damm fas fa-bookmark fa-2x"></i>
                    </Link>
                    <Link className="btn btn-outline-dark col-2 dam" to={`/profile/${JSON.parse(localStorage.getItem('identity')).id}`}>
                        <img className="dammimg round" src={JSON.parse(localStorage.getItem('identity')).profile_image_link}></img>
                    </Link>
                </div>
            </nav>
        ):(<span></span>);
    }
}

export default BottomBar;