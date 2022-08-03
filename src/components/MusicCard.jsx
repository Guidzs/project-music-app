import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
  }

  saveFavoriteMusic = async (music) => {
    const TIMEOUT = 1000;
    this.setState((prevState) => {
      const { checked } = prevState;
      return {
        loading: true,
        checked: !checked,
      };
    });
    await addSong(music);
    this.setState(() => {
      setTimeout(() => {
        this.setState({ loading: false });
      }, TIMEOUT);
    });
  }

  render() {
    const { loading, checked } = this.state;
    const { music } = this.props;
    const { trackName, trackId, previewUrl } = music;
    return (
      <div>
        { loading && <Loading /> }
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
        </audio>
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
