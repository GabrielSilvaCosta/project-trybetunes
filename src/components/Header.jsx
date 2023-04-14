import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  // esta tipo salvando no local storage
  async componentDidMount() {
    try {
      const users = await getUser();
      this.setState({ userName: users.name, loading: false });
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    // estado atualizado
    // vamos renderizar e atualizar o loading
    // se for atendido recebe "Carregando..."
    // se não userName não encontrado
    const { userName, loading } = this.state;
    return (
      <div data-testid="header-component">
        {loading ? (
          'Carregando...'
        ) : (
          <p data-testid="header-user-name">{`${userName} usuário inválido`}</p>
        )}
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Musicas Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
