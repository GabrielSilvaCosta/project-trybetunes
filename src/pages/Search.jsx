import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '', // estado para armazenar o nome do artista
    };
  }

  // atualizar o estado quando o valor do input muda
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // atualizado o botão
  handleSearchClick = () => {
    const { artistName } = this.state;
    console.log(artistName);
  };

  // se for menor que 2 não vai ser habilitado
  // so se for maior
  render() {
    const { artistName } = this.state;
    const isSearchDisabled = artistName.length < 2;

    return (
      <div data-testid="page-search">
        <Header />
        <div data-testid="page-login">
          <h1>Pesquisar Artista</h1>
          <form>
            <input
              data-testid="search-artist-input"
              name="artistName"
              type="text"
              value={ artistName }
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              onClick={ this.handleSearchClick }
              disabled={ isSearchDisabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
