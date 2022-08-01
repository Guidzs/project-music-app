import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    userName: '',
    // userImage: '',
    // userDescription: '',
    // userEmail: '',
    loading: true,
  }

  async componentDidMount() {
    const data = await getUser();
    const { name } = data;
    this.setState({
      userName: name,
      // userImage: image,
      // userEmail: email,
      // userDescription: description,
    });
  }

  componentDidUpdate() {
    const { loading } = this.state;
    if (loading) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : (
          <p data-testid="header-user-name">
            {userName}
          </p>
        )}
      </header>
    );
  }
}
