import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange({ target }) {
    const { trackName, previewUrl, trackId } = this.props;
    console.log(target.checked);
    console.log(trackName);
    console.log(previewUrl);
    console.log(trackId);
    const obj = { trackName, previewUrl, trackId };
    if (target.checked) {
      this.setState({ loading: true, favorite: true });
      await addSong(obj);
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
                onChange={ this.handleChange }
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
