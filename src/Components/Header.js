import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Logo from '../images/Logo.png';
import userImage from '../images/userImage.png';
// eslint-disable-next-line no-unused-vars
import HeaderCss from '../Css/HeaderCss.css';
import Carregando from './Carregando';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getUserApi();
  }

  getUserApi = () => {
    this.setState({ loading: true }, async () => {
      const { name, image } = await getUser();
      this.setState({
        user: name,
        image,
        loading: false,
      });
    });
  }

  render() {
    const { user, loading, image } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        <div className="container-links">
          <Link data-testid="link-to-search" to="/search"><p>Search</p></Link>
          <Link data-testid="link-to-favorites" to="/favorites"><p>Favorites</p></Link>
          <Link data-testid="link-to-profile" to="/profile"><p>Profile</p></Link>
        </div>
        <img className="image" src={ Logo } alt="logo" />
        {loading
          ? (
            <div className="container-user">
              <div className="loader-component-header"><Carregando /></div>
            </div>
          )
          : (
            <div className="container-user">
              {image !== '' ? (
                <img src={ image } alt="userImage" />
              ) : (
                <img src={ userImage } alt="userImage" />
              )}
              <p data-testid="header-user-name">{ user }</p>
            </div>)}
      </header>
    );
  }
}
