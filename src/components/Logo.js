import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import logoImg from '../../assets/app_logo.png';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom:30
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
});
