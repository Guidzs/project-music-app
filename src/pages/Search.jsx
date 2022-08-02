import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Search extends Component {
  state = {
    bandName: '',
    buttonDisabled: true,
    nameActual: '',
    albuns: [],
    loading: false,
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

  saveBandName = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { bandName } = this.state;
    const data = await searchAlbumsAPI(bandName);
    this.setState({
      nameActual: bandName,
      albuns: data,
      loading: false,
    }, () => (this.setState({ bandName: '' })));
  }

  render() {
    const {
      bandName,
      buttonDisabled,
      nameActual,
      albuns,
      loading,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading /> : (
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                name="band-name"
                value={ bandName }
                onChange={ this.ValidateName }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.saveBandName }
              >
                Pesquisar
              </button>
            </form>
          )
        }
        {
          albuns.length > 0 ? (
            <div>
              <h3>
                Resultado de álbuns de:
                {' '}
                {nameActual}
              </h3>
              <ul>
                {albuns.map((album) => {
                  const {
                    artistName,
                    collectionId,
                    collectionName,
                    artworkUrl100,
                  } = album;
                  return (
                    <li key={ collectionId }>
                      <img
                        src={ artworkUrl100 }
                        alt={ collectionName }
                      />
                      <Link
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `/album/${collectionId}` }
                      >
                        { collectionName }
                      </Link>
                      <h5>{ artistName }</h5>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : nameActual.length > 0 && <span>Nenhum álbum foi encontrado</span>
        }
      </div>
    );
  }
}
