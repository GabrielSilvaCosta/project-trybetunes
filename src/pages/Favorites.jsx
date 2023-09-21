import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    favoriteSongs: [], // Estado para armazenar a lista de músicas favoritas
    isLoading: true, // Estado para controlar o estado de carregamento
  };

  // Função assíncrona que é chamada quando o componente é montado
  async componentDidMount() {
    try {
      // Chama a função getFavoriteSongs da API para obter a lista de músicas favoritas
      const favoriteSongs = await getFavoriteSongs();
      // Atualiza o estado com a lista de músicas favoritas e marca que o carregamento foi concluído
      this.setState({ favoriteSongs, isLoading: false });
    } catch (error) {
      console.error(error);
      // Em caso de erro, marca que o carregamento foi concluído
      this.setState({ isLoading: false });
    }
  }

  // Função para lidar com a remoção de uma música favorita
  handleRemoveSong = async (music) => {
    this.setState({ isLoading: true }); // Marca que o carregamento está em andamento

    try {
      // Chama a função removeSong da API para remover a música favorita
      await removeSong(music);
      // Chama novamente a função getFavoriteSongs para atualizar a lista de músicas favoritas
      const favoriteSongs = await getFavoriteSongs();
      // Atualiza o estado com a lista de músicas favoritas atualizada e marca que o carregamento foi concluído
      this.setState({ favoriteSongs, isLoading: true });
    } catch (error) {
      console.error(error);
      // Em caso de erro, marca que o carregamento foi concluído
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />

        {/* Renderiza o componente Loading enquanto o carregamento estiver em andamento */}
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {/* Se houver músicas favoritas, renderiza a lista de MusicCard */}
            {favoriteSongs.length > 0 ? (
              favoriteSongs.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                  onRemoveSong={ () => this.handleRemoveSong(music) }
                />
              ))
            ) : (
              // Caso contrário, exibe uma mensagem de que nenhuma música favorita foi encontrada
              <p data-testid="no-favorites">Nenhuma música favorita encontrada.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
