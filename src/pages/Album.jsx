import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  // estado inicial
  constructor() {
    super();
    this.state = {
      info: null,
      musicList: [],
    };
  }

  // componentDidMount assicrona para carregar os dados
  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    // chamamos função getMusic assicrona para buscar
    // as informação
    const response = await getMusics(id);
    // buscar a informação do album primeiro elemento
    const info = response[0];
    // lista de musica 2 a diante no array lista de musica
    const musicList = response.slice(1);
    // setamos o estado
    // depois no processo atualizou info e musicList
    this.setState({ info, musicList });
    // console.log(musicList);
  }

  // estado atualizado
  // renderizamos o info
  // renderizamos o o array de musica com musicaCard para cada um das musicas
  // e aparece na interface da tela
  render() {
    const { info, musicList } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {info && (
          <div>
            <h2 data-testid="artist-name">{info.artistName}</h2>
            <h1 data-testid="album-name">{info.collectionName}</h1>
            {musicList.map((element) => (
              <MusicCard key={ element.trackId } music={ element } />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
