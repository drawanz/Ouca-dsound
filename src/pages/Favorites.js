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
    };

    this.recoverFavorites = this.recoverFavorites.bind(this);
  }

  componentDidMount() {
    this.recoverFavorites();
  }

  async recoverFavorites() {
    this.setState({ loading: true });
    const recoveredFavorites = await getFavoriteSongs();
    this.setState({ favorites: recoveredFavorites, loading: false });
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
            />
          ))}
      </div>
    );
  }
}
