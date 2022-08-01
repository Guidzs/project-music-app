import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    bandName: '',
    buttonDisabled: true,
  }

  ValidateName = (event) => {
    const { value } = event.target;

    this.setState({ bandName: value }, () => {
      this.setState(() => {
        const { bandName } = this.state;
        const MIN_LENGTH = 2;
        const buttonValidate = bandName.length >= MIN_LENGTH;
        return {
          buttonDisabled: !buttonValidate,
        };
      });
    });
  }

  render() {
    const { buttonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="band-name"
            onChange={ this.ValidateName }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
