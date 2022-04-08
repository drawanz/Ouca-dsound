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
    const { name, email, image } = await getUser();
    this.setState({ name, email, image });
  }

  render() {
    const { name, email, defaultDescription, image,
      defaultImage } = this.state;

    return (
      <div className="container-page-profile" data-testid="page-profile">
        <Header />
        <div className="page-profile">
          {name === ''
            ? <Carregando />
            : (
              <div className="page-profile-user">
                { image ? (
                  <img src={ image } alt="profile" data-testid="profile-image" />
                ) : (
                  <img src={ defaultImage } alt="profile" data-testid="profile-image" />
                )}
                <p>{ defaultDescription }</p>
                <form>
                  <label htmlFor="name">
                    Nome:
                    <input
                      data-testid="edit-input-name"
                      type="text"
                      name="name"
                      value={ name }
                      id="name"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <label htmlFor="email">
                    E-mail:
                    <input
                      data-testid="edit-input-email"
                      type="email"
                      name="email"
                      value={ email }
                      id="email"
                      onChange={ this.handleChange }
                    />
                  </label>

                  <Link to="/profile/edit">
                    <button
                      type="button"
                    >
                      Editar perfil
                    </button>
                  </Link>

                </form>
              </div>
            )}
        </div>
        <Footer />
      </div>
    );
  }
}
