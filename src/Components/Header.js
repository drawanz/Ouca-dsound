import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.getUserApi();
  }

  getUserApi = () => {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({
        user: name,
        loading: false,
      });
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <ul>
          <Link data-testid="link-to-search" to="/search"><li>Search</li></Link>
          <Link data-testid="link-to-favorites" to="/favorites"><li>Favorites</li></Link>
          <Link data-testid="link-to-profile" to="/profile"><li>Profile</li></Link>
        </ul>
        {loading
          ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{ user }</p>}
      </header>
    );
  }
}
