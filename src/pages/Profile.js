import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
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
    const { name, email, description, image } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {name === ''
          ? <Carregando />
          : (
            <div>
              <p>{ name }</p>
              <p>{ email }</p>
              <p>{ description }</p>
              <img src={ image } alt="profile" data-testid="profile-image" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}
