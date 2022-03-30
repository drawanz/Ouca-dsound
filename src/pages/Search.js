import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../Components/Carregando';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import SearchCss from '../Css/SearchCss.css';

export default class Search extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);

    this.state = {
      artistBandName: '',
      resultArtistBandName: '',
      isSearchButtonDisabled: true,
      loading: false,
      searchResult: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }), () => this.validationCheck());
  }

  async buttonClick() {
    const { artistBandName } = this.state;

    this.setState({
      loading: true,
      resultArtistBandName: artistBandName,
    }, async () => {
      const request = await searchAlbumsAPI(artistBandName);
      console.log(request);
      this.setState({
        loading: false,
        artistBandName: '',
        searchResult: request,
        isSearchButtonDisabled: true,
      });
    });
  }

  validationCheck() {
    const { artistBandName } = this.state;
    const loginNameReplaced = artistBandName.replaceAll(' ', '');
    const minNumber = 2;
    if (loginNameReplaced.length >= minNumber) {
      this.setState({
        isSearchButtonDisabled: false,
      });
    } else {
      this.setState({
        isSearchButtonDisabled: true,
      });
    }
  }

  render() {
    const { isSearchButtonDisabled, artistBandName, loading,
      searchResult, resultArtistBandName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading
          ? (<Carregando />)
          : (
            <form>
              <input
                name="artistBandName"
                data-testid="search-artist-input"
                placeholder="Procure o artista/banda"
                value={ artistBandName }
                onChange={ this.handleChange }
              />

              <button
                onClick={ this.buttonClick }
                disabled={ isSearchButtonDisabled }
                data-testid="search-artist-button"
                type="button"
              >
                Pesquisar
              </button>
            </form>)}
        {searchResult.length === 0
          ? <p className="nao-encontrado">Nenhum álbum foi encontrado</p>
          : (
            <div className="container-busca-encontrada">
              <p>{ `Resultado de álbuns de: ${resultArtistBandName}` }</p>
              <div className="albuns">
                {searchResult.map(({ collectionId, collectionName, artworkUrl100 }) => (
                  <div key={ collectionId } className="album">
                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      <img src={ artworkUrl100 } alt={ artworkUrl100 } />
                      <p>{ collectionName }</p>
                    </Link>
                  </div>))}
              </div>
            </div>
          ) }
      </div>
    );
  }
}
