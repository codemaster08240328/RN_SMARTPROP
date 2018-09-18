import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    TextInput
} from 'react-native'
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';
import actions from '../redux/profile/action';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
const NORTH_AMERICA = ['CA', 'MX', 'US', 'FR','RU', 'AE']
import { color } from '../settings/appconfig';
import Spinner from 'react-native-loading-spinner-overlay';



class PhoneVerify extends Component {
    constructor(props) {
        super(props)
        let userLocaleCountryCode = "UAE"
        const userCountryData = getAllCountries()
            .filter(country => NORTH_AMERICA.includes(country.cca2))
            .filter(country => country.cca2 === userLocaleCountryCode)
            .pop()
        let callingCode = null
        let cca2 = userLocaleCountryCode
        if (!cca2 || !userCountryData) {
            cca2 = 'US'
            callingCode = '1'
        } else {
            callingCode = userCountryData.callingCode
        }
        this.state = {
            cca2,
            callingCode,
            phonenum:this.props.navigation.getParam("phoneNum"),
            vericode:''
        }
        console.log(userCountryData);
        console.log(getAllCountries());
        this.getCode = this.getCode.bind(this);
        this.verifyCode = this.verifyCode.bind(this);
        this.update = this.update.bind(this);
    }

    getCode(){
        data = {
            phone_number:this.state.phonenum, 
            country_code:this.state.callingCode
        }
        this.props.dispatch(actions.getCode(data));
    }

    verifyCode(){
        data = {
            phone_number:this.state.phonenum,
            country_code:this.state.callingCode,
            verification_code:this.state.vericode
        }
        this.props.dispatch(actions.verifyCode(data));

    }
    update(){
        if(this.props.veriReducer.verifysuccess){
            data = {
                AD_User_ID:this.props.user.AD_User_ID,
                EMail:this.props.user.EMail,
                Phone:this.state.phonenum,
                phoneverified:'Y'
            }
            this.props.dispatch(actions.update(data));
        }
    }

    render() {
        const {goBack} = this.props.navigation;
        
        return (
            <View style={styles.container}>
                <Spinner visible={this.props.userReducer.updateloading||this.props.userReducer.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <View style = {styles.header}>
                    <TouchableOpacity onPress={()=>goBack()}>
                        <Icon type = 'entypo' name = 'chevron-left' color = 'white' size ={25}/>    
                    </TouchableOpacity>
                </View>
                <View style = {styles.body}>
                    <View style = {{flex:2, alignItems:'center', backgroundColor:color.light_primary, width:'100%', paddingLeft:30, paddingRight:30}}>
                        <Text style = {{color:'white', fontSize:20, fontWeight:"bold"}}>Verify Your Number</Text>
                        <Text style = {{color:'white', textAlign:"center", marginTop:10}}>Please enter your mobile number to receive a verification code. Carrier rates may apply.</Text>
                    </View>
                    <View style = {{justifyContent:"center",alignItems:"center",backgroundColor:'white', marginTop:-25,borderRadius:25,height:50,width:50, shadowColor:color.font,shadowOpacity:0.6, shadowOffset:{widht:0,height:1}, elevation:1 }}>
                        <Icon name = 'cellphone-android' type = 'material-community' color={color.font} size = {20} />                   
                    </View>
                    <View style = {{flex:1, flexDirection:"row", alignItems:'flex-end', justifyContent:'center'}}>
                        <CountryPicker
                            countryList={NORTH_AMERICA}
                            onChange={value => {
                                this.setState({ cca2: value.cca2, callingCode: value.callingCode })
                            }}
                            cca2={this.state.cca2}
                            translation="eng"
                        />
                        <Text style ={{marginLeft:5, marginTop:3}}>(+{this.state.callingCode})</Text>
                        <TextInput
                            style = {{marginTop:3, marginLeft:5, borderBottomWidth:1, borderColor:color.font, paddingLeft:5, width:150}}
                            value = {this.state.phonenum}
                            
                            onChangeText = {(phonenum)=>this.setState({phonenum})}
                        />
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style = {this.props.veriReducer.getting_success ? {color:'green'}:{color:'red'}}>{this.props.veriReducer.message}</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
                        <TouchableOpacity style = {{padding:10, width:100, backgroundColor: color.dark_primary, alignItems:'center'}} onPress = {this.getCode}>
                            <Text style = {{color:"#fff"}}>Send Code</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex:5, alignItems:'center'}}>
                    {(this.props.veriReducer.getting_success&&!this.props.veriReducer.verifysuccess)&&
                        <View>
                            <TextInput
                                style = {{borderWidth:1, borderColor:color.font, width:100, padding:10}}
                                placeholder = 'enter your verification code(4 digits code)'
                                onChangeText = {(vericode)=>this.setState({vericode})}
                            />
                            <TouchableOpacity style = {{padding:10, width:100, backgroundColor: color.dark_primary, alignItems:'center', marginTop:5}} onPress = {this.verifyCode}>
                                <Text style = {{color:"#fff"}}>Submit</Text>
                            </TouchableOpacity>     
                        </View>
                    }
                    {this.props.veriReducer.verifysuccess&&
                        <View>
                            <TouchableOpacity style = {{padding:10, width:100, backgroundColor: color.dark_primary, alignItems:'center', marginTop:5}} onPress = {this.update}>
                                <Text style = {{color:"#fff"}}>Confirm</Text>
                            </TouchableOpacity>     
                        </View>
                    }
                    </View>
                    
                </View>
            
            </View>
        )
    }
  }
    
    const styles = StyleSheet.create({
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10
        },
        instructions: {
            fontSize: 12,
            textAlign: 'center',
            color: '#888',
            marginBottom: 5
        },
        data: {
            padding: 15,
            marginTop: 10,
            backgroundColor: '#ddd',
            borderColor: '#888',
            borderWidth: 1 / PixelRatio.get(),
            color: '#777'
        },
        container:{
            flex:1,
            backgroundColor:'#fff'
        },
        header:{
            flex:0.5,
            backgroundColor:color.light_primary,
            flexDirection:"row",
            paddingLeft:15,
            alignItems:'center',
            paddingTop:15,
        },
        body:{
            flex:11,
            backgroundColor:'#fff',
            alignItems:'center'
        }
    })

  function mapStateToProps(state){
    return{
      auth:state.authReducer,
      veriReducer:state.veriReducer,
      user:state.userReducer.user,
      userReducer:state.userReducer
    }
  }
  
  export default connect(mapStateToProps)(PhoneVerify);

