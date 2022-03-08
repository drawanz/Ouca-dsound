import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };

    this.musics = this.musics.bind(this);
    this.teste = this.teste.bind(this);
  }

  componentDidMount() {
    this.teste();
  }

  async teste() {
    const musics = await this.musics();
    const removeFirstItemMusics = musics.shift();
    console.log(removeFirstItemMusics);
    if (musics[0].artistName) {
      this.setState({
        musics,
      });
    }
  }

  async musics() {
    const { match: { params: { id } } } = this.props;
    const requestedMusics = await getMusics(id);
    return requestedMusics;
  }

  render() {
    const { musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {musics.length > 0
          && (
            <div>
              <p data-testid="artist-name">{ musics[0].artistName }</p>
              <p data-testid="album-name">{ musics[0].collectionName }</p>
              {musics.map(({ trackName, trackId, previewUrl }) => (
                <MusicCard
                  key={ trackId }
                  trackName={ trackName }
                  trackId={ trackId }
                  previewUrl={ previewUrl }
                />))}
            </div>
          ) }
      </div>
    );
  }
}

Album.propTypes = ({
  id: propTypes.string,
}).isRequired;
