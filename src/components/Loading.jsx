import React, { Component } from 'react';

class Loading extends Component {
  render() {
    const loadingStyle = {
    // Defina os estilos CSS desejados aqui
      fontSize: '18px',
      color: '#333',
      fontStyle: 'italic',
      margin: '20px',
      // etc...
    };

    return (
      <div style={ loadingStyle }>Carregando...</div>
    );
  }
}

export default Loading;
