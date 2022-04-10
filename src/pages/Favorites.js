import React, { Component } from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../Components/Carregando';
import MusicCard from '../Components/MusicCard';
import Footer from '../Components/Footer';
import FavoriteCss from '../Css/FavoritesCss.css';
import Love from '../images/Love.svg';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      loading: false,
    };

    this.recoverFavorites = this.recoverFavorites.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.recoverFavorites();
  }

  handleClick() {
    this.recoverFavorites();
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
      <div className="page-favorites">
        <Header />
        <div className="container-favorites">
          {!loading && <h1>Favorites</h1>}
          {loading ? <div className="loader-component"><Carregando /></div>
            : favorites.map((music, index) => (
              <div className="container-favorite-music" key={ index }>
                <MusicCard
                  artistName={ music.artistName }
                  collectionName={ music.collectionName }
                  artwork={ music.artwork }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  handleClick={ this.handleClick }
                />
              </div>
            ))}
        </div>
        <Footer />
      </div>
    );
  }
}
