import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
      <label htmlFor="name">
        <input
          data-testid="search-artist-input"
          type="text"
          name="name"
          onChange={ this.handleSearchClick }
          value={ name }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          onClick={ this.getAlbumsUpdate }
          disabled={ buttonEnable }
        >
          Pesquisar
        </button>
        {albums.length !== 0 && this.savedAlbum()}
        {albums.length === 0 && saved !== false && (
          // verifica se array de albuns esta salvo
          // se não não vai ser encontrado
          <p>Nenhum álbum foi encontrado</p>
        )}
      </label>
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
        <div data-testid="page-search">Pesquisar</div>
        {label ? <Loading /> : this.renderState()}
        <section>
          {albums.map((element) => (
            <div key={ element.collectionId }>
              <Link
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >
                <div>{element.artistName}</div>
                <img src={ element.artworkUrl100 } alt={ element.collectionName } />
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
