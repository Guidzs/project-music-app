import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musics: [],
    dataAlbum: {},
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      musics: data,
      dataAlbum: { ...data[0] },
    });
  }

  render() {
    const { musics, dataAlbum } = this.state;
    const { artistName, collectionName } = dataAlbum;
    // musics.shift();
    return (
      <div data-testid="page-album">
        <Header />
        {
          musics.length > 0 && (
            <div>
              <h2 data-testid="artist-name">
                {artistName}
              </h2>
              <h1 data-testid="album-name">
                {collectionName}
              </h1>
              <ul>
                {
                  musics.slice(1).map((music) => {
                    const {
                      trackId,
                    } = music;
                    return (
                      <li key={ trackId }>
                        <MusicCard
                          music={ music }
                        />
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
