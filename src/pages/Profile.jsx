import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../profile.css';

class Profile extends Component {
  state = {
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    this.updateUser();
  }

  updateUser = async () => {
    try {
      const data = await getUser();
      this.setState({ isLoading: false, user: data });
    } catch (error) {
      console.error('Erro ao obter informações do perfil do usuário:', error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, user } = this.state;

    return (
      <div data-testid="page-profile" className="profile-container">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="profile-card">
            <h1 data-testid="user-name">{user && user.name}</h1>
            <p>
              Email:
              {' '}
              {user && user.email}
            </p>
            {user && user.profileImage ? (
              <img
                src={ user.profileImage }
                alt={ user.name }
                data-testid="profile-image"
              />
            ) : (
              <img
                src="https://avatars.githubusercontent.com/u/107433500?v=4"
                alt={ user.name }
                data-testid="profile-image"
              />
            )}
            <p>
              Descrição:
              {' '}
              {user && user.description}
            </p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
