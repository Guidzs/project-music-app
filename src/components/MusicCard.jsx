import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loadingAddSong: false,
    checked: false,
    loadingSongsRequest: false,
    // favoriteListApi: [],
  }

  async componentDidMount() {
    const TIMEOUT = 1000;
    this.setState({ loadingSongsRequest: true });
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((track) => {
      const { music } = this.props;
      if (music.trackId === track.trackId) {
        this.setState({ checked: true });
      }
    });
    setTimeout(() => {
      this.setState({
        loadingSongsRequest: false,
        // favoriteListApi: favoriteSongs,
      });
    }, TIMEOUT);
  }

  saveFavoriteMusic = async (music) => {
    const TIMEOUT = 1000;
    this.setState((prevState) => {
      const { checked } = prevState;
      return {
        loadingAddSong: true,
        checked: !checked,
      };
    });
    await addSong(music);
    this.setState(() => {
      setTimeout(() => {
        this.setState({ loadingAddSong: false });
      }, TIMEOUT);
    });
  }

  render() {
    const { loadingAddSong, checked, loadingSongsRequest } = this.state;
    const { music } = this.props;
    const { trackName, trackId, previewUrl } = music;
    return (
      <div>
        { loadingAddSong && <Loading /> }
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
        </audio>
        { loadingSongsRequest ? <Loading /> : (
          <label
            htmlFor={ trackId }
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="favorite"
              checked={ checked }
              onChange={ () => this.saveFavoriteMusic(music) }
            />
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};
