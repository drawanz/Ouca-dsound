import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// eslint-disable-next-line no-unused-vars
import ProfileCss from '../Css/ProfileCss.css';
import Carregando from '../Components/Carregando';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      defaultDescription: 'Usuário padrão',
      defaultImage: 'https://media-public.canva.com/stf1k/MAC3CSstf1k/3/t.png',
      image: '',
    };

    this.requestUser = this.requestUser.bind(this);
  }

  componentDidMount() {
    this.requestUser();
  }

  async requestUser() {
    const { name, email, description, image } = await getUser();
    this.setState({ name, email, description, image });
  }

  render() {
    const { name, email, description, defaultDescription, image,
      defaultImage } = this.state;

    return (
      <div className="page-profile" data-testid="page-profile">
        <Header />
        <div className="page-profile-user">
          {name === ''
            ? <Carregando />
            : (
              <div className="page-profile-user">
                { image ? (
                  <img src={ image } alt="profile" data-testid="profile-image" />
                ) : (
                  <img src={ defaultImage } alt="profile" data-testid="profile-image" />
                )}
                <p>{ `Nome: ${name}` }</p>
                <p>{ `Email: ${email}` }</p>
                { description ? (
                  <p>{ description }</p>
                ) : (
                  <p>{ defaultDescription }</p>
                )}
                <Link to="/profile/edit">
                  <button
                    type="button"
                  >
                    Editar perfil
                  </button>
                </Link>
              </div>
            )}
        </div>
        <Footer />
      </div>
    );
  }
}
