import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../musicCard.css';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    isLoading: true, // Inicialmente definimos isLoading como true para exibir "Carregando..."
    // enquanto aguardamos a resposta da API
  };

  async componentDidMount() {
    // Ao montar o componente,
    // chamamos a função getFavoriteSongs para recuperar a lista de músicas favoritas
    try {
      const favorite = await getFavoriteSongs();
      // Verificamos se a música atual é uma das favoritas retornadas pela API
      const { music } = this.props;
      const isFavorite = favorite.some((eleme) => eleme.trackId === music.trackId);
      this.setState({ isFavorite, isLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  }

  handleCheckbox = async () => {
    const { music } = this.props;
    const { isFavorite } = this.state;
    this.setState({ isLoading: true });

    try {
      if (isFavorite) {
        // Remove a música da lista de favoritos
        // objeto que tem informação de uma musica
        // requisito 11
        await removeSong(music);
        this.setState({ isFavorite: false });
      } else {
        // Adiciona a música à lista de favoritos
        await addSong(music, true);
        this.setState({ isFavorite: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      //  // Atualiza o estado para esconder o status do carregamento
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { music } = this.props;
    const { isFavorite, isLoading } = this.state;

    return (
      <div className="music-card" data-testid="music-card">
        <h2 className="music-name" data-testid="music-name">{music.trackName}</h2>
        <audio
          className="audio-component"
          data-testid="audio-component"
          src={ music.previewUrl }
          controls
        >
          <track kind="captions" />
          Seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label>
          ❤️
          <input
            type="checkbox"
            checked={ isFavorite }
            onChange={ this.handleCheckbox }
            data-testid={ `checkbox-music-${music.trackId}` }
            disabled={ isLoading }
          />
        </label>
        {isLoading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
