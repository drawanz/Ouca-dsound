import React, { Component } from 'react';
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import Logo from '../images/Logo.png';
// eslint-disable-next-line no-unused-vars
import FooterCss from '../Css/FooterCss.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container-corporation">
          <p>©2022 DSound</p>
        </div>
        <img className="img" src={ Logo } alt="logo" />
        <div className="container-icones">
          <FaFacebook />
          <FaYoutube />
          <FaTwitter />
          <FaInstagram />
        </div>
      </footer>
    );
  }
}

export default Footer;
