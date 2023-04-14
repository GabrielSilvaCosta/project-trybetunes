import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  // estado inicial como falso

  state = {
    isFavorite: false,
    isLoading: false,
  };

  handleCheckbox = async () => {
    const { music } = this.props;
    const { isFavorite } = this.state;

    // Atualiza o estado para exibir estado carregamento
    this.setState({ isLoading: true });

    try {
      if (isFavorite) {
        // Remove a música da lista de favoritos
        await addSong(music, false);
        this.setState({ isFavorite: false });
      } else {
        // Adiciona a música à lista de favoritos
        await addSong(music, true);
        this.setState({ isFavorite: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Atualiza o estado para esconder o status do carregamento
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { music } = this.props;
    const { isFavorite, isLoading } = this.state;

    return (
      <div data-testid="music-card">
        <h2 data-testid="music-name">{music.trackName}</h2>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          Seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label>
          Favorita
          <input
            type="checkbox"
            checked={ isFavorite }
            onChange={ this.handleCheckbox }
            data-testid={ `checkbox-music-${music.trackId}` }
            disabled={ isLoading }
            // verifica se esta carregando ou não
          />
        </label>
        {isLoading && <p>Carregando...</p>}
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
