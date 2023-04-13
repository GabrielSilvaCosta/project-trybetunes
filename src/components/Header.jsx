import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true, // Iniciar como true para exibir "Carregando..."
    };
  }

  // tentar chamar a função getUser
  // recuperar usuario do componete
  // com nome do usuario recuperado
  async componentDidMount() {
    try {
      const users = await getUser();
      this.setState({ userName: users.name, loading: false });
    } catch (error) {
      console.error('Erro ao recuperar usuario:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    // estado atualizado
    // vamos renderizar e atualizar o loading
    // se for antendida recebe carregando
    // se nao userName não encontrado
    const { userName, loading } = this.state;
    return (
      <div data-testid="header-component">
        {loading ? (
          'Carregando...'
        ) : (
          <p data-testid="header-user-name">{`${userName} usuario invalido`}</p>
        )}
      </div>
    );
  }
}

export default Header;
