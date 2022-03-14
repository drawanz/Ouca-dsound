import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from '../Components/Carregando';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      buttonDisabled: true,
      redirect: false,
      loading: false,
    };

    this.requestUser = this.requestUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validationCheck = this.validationCheck.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.validationName = this.validationName.bind(this);
    this.validationEmail = this.validationEmail.bind(this);
    this.validationDescription = this.validationDescription.bind(this);
    this.validationImage = this.validationImage.bind(this);
  }

  componentDidMount() {
    this.requestUser();
  }

  handleChange({ target: { name, value } }) {
    this.setState(() => ({
      [name]: value,
    }), () => this.validationCheck());
  }

  async buttonClick() {
    const { name, email, description, image } = this.state;
    const obj = { name, email, image, description };
    await updateUser(obj);
    console.log(obj);
    this.setState({ redirect: true });
  }

  validationCheck() {
    if (this.validationName() && this.validationEmail()
      && this.validationDescription() && this.validationImage()) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  validationName() {
    const { name } = this.state;
    const loginNameReplaced = name.replaceAll(' ', '');
    const minNumber = 1;
    return (loginNameReplaced.length >= minNumber);
  }

  validationEmail() {
    const { email } = this.state;
    return (email.includes('@') && email.includes('.com'));
  }

  validationDescription() {
    const { description } = this.state;
    return (description.length >= 1);
  }

  validationImage() {
    const { image } = this.state;
    return (image.length >= 1);
  }

  async requestUser() {
    this.setState({ loading: true });
    const { name, email, description, image } = await getUser();
    this.setState({ name, email, description, image, loading: false });
  }

  render() {
    const { name, email, description, image, buttonDisabled,
      redirect, loading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>ProfileEdit</h1>
        {loading === true
          ? <Carregando />
          : (
            <form>
              <label htmlFor="name">
                Nome:
                <input
                  data-testid="edit-input-name"
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
                  name="email"
                  value={ email }
                  id="email"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <input
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  id="description"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="image">
                Imagem:
                <input
                  data-testid="edit-input-image"
                  name="image"
                  value={ image }
                  id="image"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ buttonDisabled }
                onClick={ this.buttonClick }
              >
                Salvar
              </button>
            </form>
          )}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}
