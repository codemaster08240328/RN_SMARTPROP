import React, {Component} from 'react';
import Logo from '../../components/Logo';
import Form from '../../components/Form';
import Wallpaper from '../../components/Wallpaper';
import ButtonSubmit from '../../components/ButtonSubmit';
import SignupSection from '../../components/SignupSection';
import {connect }from 'react-redux';
import actions from '../../redux/auth/action';


import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,

  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from '../../components/UserInput';


import usernameImg from '../../../assets/username.png';
import passwordImg from '../../../assets/password.png';
import eyeImg from '../../../assets/eye_black.png';
class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:"habib.salhi@yandex.com",
      password:"MasterAdmin",
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
    this.submit = this.submit.bind(this);
    this.onEmailText = this.onEmailText.bind(this);
    this.onPassText = this.onPassText.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  submit(){
    param = {
      'EMail':this.state.email,
      'password_text':this.state.password

    }
    this.props.dispatch(actions.login(param));
  }

  onEmailText(email){
    this.setState({email});
  }
  onPassText(password){
    this.setState({password});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.loginsuccess == true){
        setTimeout(()=>{
          this.props.navigation.navigate("role");
        }, 600);
    }else if(nextProps.auth.loginsuccess == false){
      alert(nextProps.auth.message);
    }
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <UserInput
            source={usernameImg}
            placeholder="Username"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            value = {this.state.email}
            changeText = {this.onEmailText}
          />
          <UserInput
            source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            value = {this.state.password}
            changeText = {this.onPassText}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass}>
            <Image source={eyeImg} style={styles.iconEye} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <SignupSection />
        <ButtonSubmit {...this.props} onPressed = {this.submit}/>
      </Wallpaper>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: '#7d7d80',
    marginTop:7
  },
});

function mapStateToProps(state){
  return{
    auth:state.authReducer
  }
}

export default connect(mapStateToProps)(LoginScreen);
