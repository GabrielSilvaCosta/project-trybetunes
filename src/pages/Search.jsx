import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../Search.css';

class Search extends Component {
  // estado inicial
  state = {
    buttonEnable: true,
    name: '',
    albums: [],
    label: false,
    saved: '',
  };

  // atualizar o estado quando o valor do input muda
  // botão e true se o comprimento maior que 2
  handleSearchClick = ({ target }) => {
    const { name, value } = target;
    // setamos estado atualizado
    this.setState({
      [name]: value,
      buttonEnable: value.length < 2,
    });
  };

  // valor do imput name e atualizar
  // estado atual, saved, name, label
  // adicionou name dentro do saved
  // para salvar o nome do artista pesquisado
  getAlbumsUpdate = () => {
    const { name } = this.state;
    this.setState(
      {
        saved: name,
        name: '',
        label: true,
      },
      () => {
        // quando a requisição for cocluida vai salvar em albuns
        // e o label vira falso
        searchAlbumsAPI(name).then((result) => this.setState({
          albums: result,
          label: false,
        }));
      },
    );
  };

  // salvar o nome do artista
  // para mostrar na interface
  // saved vai exibir o artista pesquisado
  savedAlbum = () => {
    const { saved } = this.state;
    return (
      <span>
        Resultado de álbuns de:
        {' '}
        {saved}
      </span>
    );
  };

  // atualizando os estados com formulario
  renderState = () => {
    const { buttonEnable, name, albums, saved } = this.state;
    return (
      <div className="search-container">
        <label htmlFor="name" className="search-label">
          <input
            data-testid="search-artist-input"
            type="text"
            name="name" // esse name tem que ser igual o value
            onChange={ this.handleSearchClick }
            value={ name }
            className="search-input"
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            onClick={ this.getAlbumsUpdate }
            disabled={ buttonEnable }
            className="search-button"
          >
            Pesquisar
          </button>
        </label>
        {albums.length !== 0 && this.savedAlbum()}
        {albums.length === 0 && saved !== false && (
          // verifica se array de albuns esta salvo
          // se não não vai ser encontrado
          <p className="search-error">Nenhum álbum foi encontrado</p>
        )}
      </div>
    );
  };

  // Verifica o valor do estado label. Se label for verdadeiro,
  // renderiza o componente Loading, caso contrário, chama o método renderState()
  // renderizar pagina busca de albuns
  render() {
    const { albums, label } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search" />
        {label ? <Loading /> : this.renderState()}
        <section className="album-card-container">
          {' '}
          {/* Adiciona a classe album-card-container ao elemento section */}
          {albums.map((element) => (
            <div className="album-card" key={ element.collectionId }>
              <Link
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >
                <img src={ element.artworkUrl100 } alt={ element.collectionName } />
                <div>{element.artistName}</div>
                <div>{element.collectionName}</div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default Search;
