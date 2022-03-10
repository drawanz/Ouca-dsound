import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: false,
    };

    this.favoriteSong = this.favoriteSong.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  async getFavorites() {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false });
    const { trackId } = this.props;
    console.log(favorites);
    if (favorites.find((item) => item.trackId === trackId)) {
      console.log('xablau');
      this.setState({ loading: true, favorite: true });
    }
    this.setState({ loading: false });
  }

  async favoriteSong({ target }) {
    const { trackName, previewUrl, trackId } = this.props;
    console.log(target.checked);
    console.log(trackName);
    console.log(previewUrl);
    console.log(trackId);
    const obj = { trackName, previewUrl, trackId };
    if (target.checked) {
      this.setState({ loading: true, favorite: true });
      await addSong(obj);
      this.getFavorites();
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, favorite } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    return (
      <section>
        {loading ? (
          <Carregando />
        ) : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="inputFavorita">
              Favorita
              <input
                name="favorite"
                id="inputFavorita"
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                checked={ favorite }
                onChange={ this.favoriteSong }
              />
            </label>
          </div>
        )}
      </section>
    );
  }
}

MusicCard.propTypes = ({ // aprendido em https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
  trackName: propTypes.string,
  previewUrl: propTypes.string,
  trackId: propTypes.string,
}).isRequired;
