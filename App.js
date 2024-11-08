import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: 0,
      rodando: false,
      ultimoTempo: null,
    };

    this.iniciarPausar = this.iniciarPausar.bind(this);
    this.resetar = this.resetar.bind(this);
  }

  intervaloInicial() {
    this.intervalo = null;
  }

  limparIntervalo() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  iniciarPausar() {
    const { rodando } = this.state;
    if (rodando) {
      clearInterval(this.intervalo);
    } else {
      this.intervalo = setInterval(() => {
        this.setState((prevState) => ({ seg: prevState.seg + 1 }));
      }, 1000);
    }
    this.setState({ rodando: !rodando });
  }

  resetar() {
    this.setState((prevState) => ({
      ultimoTempo: prevState.seg,
      seg: 0,
      rodando: false,
    }));
    clearInterval(this.intervalo);
  }

  render() {
    const { seg, rodando, ultimoTempo } = this.state;

    return (
      <View style={styles.area}>
        <Text style={styles.texto}>{seg}s</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.botao} onPress={this.iniciarPausar}>
            <Text style={styles.btnTexto}> Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={this.resetar}>
            <Text style={styles.btnTexto}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
        {ultimoTempo !== null && (
          <Text style={styles.ultimoTempTexto}>Último tempo: {ultimoTempo}s</Text>
        )}
        <Image source={require('./assets/cronometro.png')} style={styles.img} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18DCEA',
  },
  texto: {
    fontSize: 48,
    color: '#ffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#0b8ddb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ultimoTempTexto: {
    fontSize: 18,
    color: '#555',
  },
  img: {
    width: 100,
    height: 100,
    marginTop: -170,
  },
});

export default App;
