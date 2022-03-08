import React, { Component } from 'react';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import propTypes from 'prop-types';

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: '',
    };

    this.musics = this.musics.bind(this);
    this.teste = this.teste.bind(this);
  }

  componentDidMount() {
    this.teste();
  }

  async teste() {
    const musics = await this.musics();
    if (musics[0].artistName) {
      this.setState({
        musics: musics,
      });
    }
  }

  async musics() {
    const { match: { params: { id }} } = this.props;
    const requestedMusics = await getMusics(id);
    return requestedMusics;
  }

  render() {
    const { musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {musics !== ''
          && (
            <div>
              <h1 data-testid="artist-name">{ `${musics[0].artistName}` }</h1>
              <h3>
                { `${musics[0].artistName} -
                ${musics[0].collectionName}` }
              </h3>
            </div>
          ) }
      </div>
    );
  }
}

Album.propTypes
