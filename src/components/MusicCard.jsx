import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    // destruturação para acessa informação musica
    const { music } = this.props;

    return (
    // renderiza a informação da musica utilizando props
      <div data-testid="music-card">
        <h2 data-testid="music-name">{music.trackName}</h2>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          Seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
