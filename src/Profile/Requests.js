import React, { Component } from 'react';
import userService from '../Services/userService'
import { Link } from 'react-router-dom';

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: undefined,
        };
    }

    async componentDidMount() {
        userService.get_follow_requests().then(requests => {
            this.setState({
                requests: requests.data
            });
        }).catch(err => {
            this.setState({
                requests: []
            });

        })
    }

    async follow() {
        userService.follow(this.state.user.id).then(async resp => {
            let follow_state = {state: 'DNE'}

            try {
                follow_state = (await userService.get_follow(this.state.user.id)).data
            } catch (error) { }

            
            this.setState({follow_state})

        }).catch(async err => {
            let follow_state = {state: 'DNE'}

            try {
                follow_state = (await userService.get_follow(this.state.user.id)).data
            } catch (error) { }

            this.setState({follow_state})
        });
    }



    render() {
        const { requests } = this.state;
        debugger;
        return (
            <div className="container">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12 row my-4">
                    {requests && requests.map(req => (
                        <div className="row">
                            <div className="col-3">
                                {req.src}
                            </div>
                            <div className="col-3">
                                <Link className="btn btn-primary" to={`/profile/${req.src}`}>View profile</Link>
                            </div>
                            <div className="col-6">
                                Ovo sam radio na poslu, ali nisam prebacio. Izgledace lepse u sledecem releasu.
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Requests; 