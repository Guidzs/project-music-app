import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    userName: '',
    buttonDisabled: true,
    loading: false,
  }

  componentDidUpdate() {
    const TIMEOUT = 1000;
    setTimeout(() => {
      const { loading } = this.state;
      if (loading) {
        const { history: { push } } = this.props;
        push('/search');
      }
    }, TIMEOUT);
  }

  validateName = (event) => {
    const { value } = event.target;

    this.setState({
      userName: value,
    }, () => {
      this.setState(() => {
        const { userName } = this.state;
        const MIN_LENGTH = 3;
        const buttonValid = userName.length >= MIN_LENGTH;
        return {
          buttonDisabled: !buttonValid,
        };
      });
    });
  }

  saveName = (event) => {
    event.preventDefault();
    const { userName } = this.state;
    createUser({ name: userName });
    this.setState({ loading: true });
  }

  render() {
    const { buttonDisabled, loading } = this.state;

    return (
      <div data-testid="page-login">
        <div>
          { loading && <Loading />}
        </div>
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            name="user-name"
            onChange={ this.validateName }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.saveName }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
