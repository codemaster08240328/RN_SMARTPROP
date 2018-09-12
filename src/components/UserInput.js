import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import {color} from '../settings/appconfig';

export default class UserInput extends Component {
  constructor(props){
    super(props);
    this.changeText = this.changeText.bind(this);
  }
  changeText(val){
    console.log(this.props);
    const { changeText } = this.props;
    console.log(typeof changeText);
    changeText(val)
  }
  render() {
    return (
      <View style={styles.inputWrapper}>
        <Image source={this.props.source} style={styles.inlineImg} tintColor = "#7d7d80" />
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="#e9e9ef"
          underlineColorAndroid="transparent"
          value = {this.props.value}
          onChangeText = {(val)=>this.changeText(val)}
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  changeText: PropTypes.func.isRequired,
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255,1)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: color.font,
    borderColor:color.font,
  },
  inputWrapper: {
    flex: 1,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
    tintColor:color.font
  },
});
