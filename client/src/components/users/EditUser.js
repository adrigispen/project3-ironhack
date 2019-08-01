import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class EditUser extends Component {
  state = {
    id: '',
    username: '',
    password: '',
    githubLink: '',
    profileImg: '',
    role: 'student',
    submitUser: true,
    error: ''
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.user._id}`).then(response => {
      this.setState({
        id: response.data._id,
        username: response.data.username,
        githubLink: response.data.githubLink,
        profileImg: response.data.profileImg,
        role: response.data.role,
      })
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = async e => {
    const {username, githubLink, profileImg, role} = {...this.state}
    await axios.put(`/api/user/${this.state.id}`, {username, githubLink, profileImg, role})
    .then(response => {
    }).catch(err=> this.setState({
      error: err.message
    }));

    this.setState({
      error: `User edited`
    })
    // this.context.history.push('/users/');
    this.props.history.push('/users/');
  }

  render() {
    return (
      <div>
         <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" />Back to Users
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add User</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="firstName">Username:</label>
                <input 
                type="text"
                className="form-control"
                name="username"
                minLength="2"
                required
                onChange={this.onChange}
                value={this.state.firstName}
                />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                className="form-control"
                name="password"
                required
                onChange={this.onChange}
                value={this.state.lastName}
                />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label htmlFor="githubLink">Github:</label>
                <input 
                type="text"
                className="form-control"
                name="githubLink"
                onChange={this.onChange}
                value={this.state.githubLink}
                />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label htmlFor="profileImg">Profile Image:</label>
                <input 
                type="text"
                className="form-control"
                name="profileImg"
                onChange={this.onChange}
                value={this.state.profileImg}
                />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select 
                  name="role"
                  onChange={this.onChange}
                  value={this.state.role}
                  >
                    <option value="student">Student</option>
                    <option value="TA">TA</option>
                    <option value="teacher">Teacher</option>

                  </select>
              </div>
            </form>
            {this.state.error && (
              <Alert variant="warning">{this.state.error}</Alert>
            )}
            <input 
              type="submit" 
              value="Submit"
              className="btn mt-4 btn-primary btn-block"
              onClick={this.onSubmit}
            />  
          </div>
        </div>
      </div>
      </div>
    )
  }
}
