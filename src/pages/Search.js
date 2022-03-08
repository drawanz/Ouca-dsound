import React, { Component } from 'react';
import Header from '../Components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    // this.buttonClick = this.buttonClick.bind(this);

    this.state = {
      artistBandName: '',
      isSearchButtonDisabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }), () => this.validationCheck());
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
    const { isSearchButtonDisabled, artistBandName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <input
            name="artistBandName"
            data-testid="search-artist-input"
            placeholder="Procure o artista/banda"
            value={ artistBandName }
            onChange={ this.handleChange }
          />

          <button
            disabled={ isSearchButtonDisabled }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
