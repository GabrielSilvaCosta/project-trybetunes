import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    // estado inicial
    super();
    this.state = {
      name: '',
      loading: false,
    };
  }

  // atualizar o estado quando valor input muda
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  // função assicrona para o click do botão
  handleButtonClick = async (event) => {
    const { history } = this.props;
    const numero = 3;
    event.preventDefault();
    const { name } = this.state;
    if (name.length >= numero) {
      this.setState({ loading: true });
      await createUser({ name });
      this.setState({ loading: false });
      // Redirecionar para a rota /search após salvar a informação
      // para outra pagina
      history.push('/search');
    }
  };

  render() {
    const { name, loading } = this.state;
    const numero = 3; // Moved the constant declaration to the render method
    const isButtonDisabled = name.length < numero || loading;

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              id="name"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <button
            data-testid="login-submit-button"
            onClick={ this.handleButtonClick }
            disabled={ isButtonDisabled }
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
