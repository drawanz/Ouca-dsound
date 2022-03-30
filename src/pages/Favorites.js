import React, { Component } from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../Components/Carregando';
import MusicCard from '../Components/MusicCard';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      loading: false,
      // reloadPage: false,
    };

    this.recoverFavorites = this.recoverFavorites.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }

  componentDidMount() {
    this.recoverFavorites();
  }

  handleClick() {
    this.recoverFavorites();
  }

  handleClick2() {
    // this.setState({ reloadPage: false });
  }

  async recoverFavorites() {
    this.setState({ loading: true }, async () => {
      const recoveredFavorites = await getFavoriteSongs();
      this.setState({ favorites: recoveredFavorites, loading: false });
    });
  }

  render() {
    const { favorites, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        {loading ? <Carregando />
          : favorites.map(({ trackName, previewUrl, trackId }, index) => (
            <MusicCard
              key={ index }
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
              handleClick={ this.handleClick }
            />
          ))}
        {/* <button type="button" onClick={ this.handleClick }>aa</button>
        <button type="button" onClick={ this.handleClick2 }>aa2</button> */}
      </div>
    );
  }
}
