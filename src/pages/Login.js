/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../Components/Carregando';
import Footer from '../Components/Footer';
import Logo from '../images/Logo.png';
import LoginCss from '../Css/LoginCss.css';
import manOutside from '../images/imagesPeople/manOutside.png';
import womanDancing from '../images/imagesPeople/womanDancing.png';
import womanRunning from '../images/imagesPeople/womanRunning.png';
import manWorking from '../images/imagesPeople/manWorking.png';

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
            <div>
              <header>
                <img className="img" src={ Logo } alt="logo" />
                <p>DSound</p>
              </header>
              <form>
                <h1>Faça o login e ouça suas músicas favoritas!</h1>
                <div className="div-inputs">
                  <label htmlFor="login-name-input">
                    <input
                      id="login-name-input"
                      data-testid="login-name-input"
                      placeholder="Digite seu usuário"
                      name="loginName"
                      value={ loginName }
                      onChange={ this.handleChange }
                    />
                  </label>
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    onClick={ this.buttonClick }
                    disabled={ isEnterButtonDisabled }
                  >
                    Entrar
                  </button>
                </div>
              </form>
              <div className="div-imgs">
                <div className="img-down">
                  <img src={ manOutside } alt="manOutside" />
                </div>
                <div className="img-up">
                  <img src={ womanDancing } alt="womanDancing" />
                </div>
                <div className="img-down">
                  <img src={ womanRunning } alt="womanRunning" />
                </div>
                <div className="img-up">
                  <img src={ manWorking } alt="manWorking" />
                </div>
              </div>
              <Footer />
            </div>)
          : <Carregando />}
        <Route exact path="/">
          {redirect && <Redirect to="/search" />}
        </Route>
      </div>
    );
  }
}
