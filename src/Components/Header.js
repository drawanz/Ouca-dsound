import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Logo from '../images/Logo.png';
import userImage from '../images/userImage.png';
// eslint-disable-next-line no-unused-vars
import HeaderCss from '../Css/HeaderCss.css';

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
      <header data-testid="header-component" className="header-component">
        <div className="container-links">
          <img src={ Logo } alt="logo" />
          <Link data-testid="link-to-search" to="/search"><p>Search</p></Link>
          <Link data-testid="link-to-favorites" to="/favorites"><p>Favorites</p></Link>
          <Link data-testid="link-to-profile" to="/profile"><p>Profile</p></Link>
        </div>
        {loading
          ? <p>Carregando...</p>
          : (
            <div className="container-user">
              <img src={ userImage } alt="userImage" />
              <p data-testid="header-user-name">{ user }</p>
            </div>)}
      </header>
    );
  }
}
