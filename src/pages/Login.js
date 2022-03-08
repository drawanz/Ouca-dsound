import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../Components/Carregando';

export default class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validationCheck = this.validationCheck.bind(this);
    this.buttonClick = this.buttonClick.bind(this);

    this.state = {
      loginName: '',
      isEnterButtonDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }), () => this.validationCheck());
  }

  async buttonClick() {
    const { loginName } = this.state;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: loginName });
      this.setState({
        loading: false,
        redirect: true,
      });
    });
  }

  validationCheck() {
    const { loginName } = this.state;
    const loginNameReplaced = loginName.replaceAll(' ', '');
    const minNumber = 3;
    if (loginNameReplaced.length >= minNumber) {
      this.setState({
        isEnterButtonDisabled: false,
      });
    } else {
      this.setState({
        isEnterButtonDisabled: true,
      });
    }
  }

  render() {
    const { loginName, isEnterButtonDisabled, loading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        {!loading
          ? (
            <form>
              <label htmlFor="login-name-input">
                <input
                  id="login-name-input"
                  data-testid="login-name-input"
                  placeholder="Digite seu login"
                  name="loginName"
                  value={ loginName }
                  onChange={ this.handleChange }

                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  onClick={ this.buttonClick }
                  disabled={ isEnterButtonDisabled }
                >
                  Entrar
                </button>
              </label>
            </form>)
          : <Carregando />}
        <Route exact path="/">
          {redirect && <Redirect to="/search" />}
        </Route>
      </div>
    );
  }
}
