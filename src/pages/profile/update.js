import React, {Component} from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, TextInput} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Avatar from '../../components/Avatar';

import {connect} from 'react-redux';
import Dimensions from 'Dimensions';
import { color } from '../../settings/appconfig';
import avatar from '../../../assets/avatar.png';
import Spinner from 'react-native-loading-spinner-overlay';

const DEVICE_WIDTH = Dimensions.get('window').width;
import actions from '../../redux/profile/action';
import imageaction from '../../redux/image/action';
import ImagePicker from 'react-native-image-picker';

const options = {
    title:'Select Photo',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality:1,
}

class ProfileUpdateView extends Component{

    constructor(props){
        super(props);
        this.state={
            email:this.props.user.EMail,
            imageSource:null,
            cur_pwd:'',
            new_pwd:'',
            conf_pwd:'',
            username:this.props.user.Name,
            phone1:(this.props.user.Phone == " - ")?"":this.props.user.Phone,
            phone2:(this.props.user.Phone2 == " - ")?'':this.props.user.Phone2,
            userid:this.props.user.Value,
            phoneverified:this.props.user.phoneverified
        }
        this.update = this.update.bind(this);
        this.getPhoto = this.getPhoto.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.phoneNumChange = this.phoneNumChange.bind(this);
        this.navigate = this.navigate.bind(this);
    }
    getPhoto(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source =  response.data
          
                this.setState({
                    imageSource: source
                });
            }
          }); 
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            phone1:nextProps.user.Phone,
            phone2:nextProps.user.Phone2,
            userid:nextProps.user.Value,
            phoneverified:nextProps.user.phoneverified,
            username:nextProps.user.Name
        })
    }
    navigate(){
        data = {
            phoneNum:this.state.phone1
        }
        this.props.navigation.navigate('verify', data)
    }
    uploadPhoto(){
        if(!this.state.imageSource){
            return;
        }
        data = {
            AD_Client_ID:this.props.user.AD_User_ID,
            AD_Org_ID:this.props.user.AD_Org_ID,
            Name:this.props.image.BinaryData,
            BinaryData:this.state.imageSource
        }

        this.props.dispatch(imageaction.uploadImage(data));


    }
    phoneNumChange(phone1){
        this.setState({phoneverified:"N",phone1:phone1});
    }

    update(){
        // if(!this.state.cur_pwd)
        // {
        //     return;
        // }
        userInfo = {
            AD_User_ID:this.props.user.AD_User_ID,
            EMail:this.state.email,
            Name:this.state.username,
            Value:this.state.userid,
            Phone:this.state.phone1,
            Phone2:this.state.phone2,
            phoneverified:this.state.phoneverified
        }
        if(this.state.new_pwd&&(this.state.new_pwd==this.state.conf_pwd)){
            data = {...userInfo, Password:this.state.new_pwd};
        }else if(!this.state.new_pwd){
            data = {...userInfo}
        }else{
            alert("Password doesn't match!");
            data = {...userInfo}
        }
        console.log("data",data);
        this.props.dispatch(actions.update(data));
        
        
    }
   

    // getStatus(param){
    //     if(param=="Y")
    //         return 'Verified';
    //     else if(param == 'N')
    //         return 'Nonverified';
    // }

    render(){
        const {goBack} = this.props.navigation;

        return(

            <View style = {styles.container}>
                <Spinner visible={this.props.userReducer.updateloading||this.props.userReducer.loading||this.props.imageReducer.uploadloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />

                <View style = {styles.header}>
                    <TouchableOpacity onPress={()=>goBack()}>
                        <Icon type = 'entypo' name = 'chevron-left' color = 'white' size ={25}/>    
                    </TouchableOpacity>
                    <Text style = {{color:'#fff', fontSize:20, paddingLeft:10}}>Edit Profile</Text>
                </View>
                <View style = {{flex:1.5, flexDirection:'row', padding:15}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Avatar
                            size="medium"
                            rounded
                            source={(this.state.imageSource!=null)?{uri:`data:image/jpeg;base64,${this.state.imageSource}`}:{uri:`data:image/jpeg;base64,${this.props.image.BinaryData}`}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            />
                    </View>
                    
                    <View style={{flex:2, justifyContent:'center'}}>
                        <TouchableOpacity onPress={this.getPhoto}>
                            <Text style = {{fontSize:15, color:color.font}}> Change Photo </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <TouchableOpacity onPress={this.uploadPhoto}>
                            <Icon name = 'cloud-upload' type = 'material-community' color={this.state.imageSource?color.dark_primary:color.font} size = {20} />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style = {styles.body}>
                    
                        <TextInput
                            style = {styles.input}
                            onChangeText = {(email)=>this.setState({email})}
                            value = {this.state.email}
                            placeholder = 'Email'
                        />

                        <TextInput
                            style = {styles.input}
                            onChangeText = {(username)=>this.setState({username})}
                            value = {this.state.username}
                            placeholder = 'User Name'
                        />
                    
                        <TextInput
                            style = {styles.input}
                            onChangeText = {(userid)=>this.setState({userid})}
                            value = {this.state.userid}
                            placeholder = "User ID"/>
                    
                        <TextInput
                            secureTextEntry = {true}
                            style = {styles.input}
                            onChangeText = {(new_pwd)=>this.setState({new_pwd})}
                            
                            placeholder = "New password"/>
                    
                        <TextInput
                            style = {styles.input}
                            secureTextEntry = {true}
                            onChangeText = {(conf_pwd)=>this.setState({conf_pwd})}

                            placeholder = 'Confirm password'/>
                    
                        <TextInput
                            style = {styles.input}
                            keyboardType = "numeric"
                            onChangeText = {(phone1)=>this.phoneNumChange(phone1)}
                            value = {this.state.phone1}
                            placeholder = "Phone number 1"/>
                    
                        <TextInput
                            style = {styles.input}
                            keyboardType = "numeric"
                            onChangeText = {(phone2)=>this.setState({phone2})}
                            value = {this.state.phone2}
                            placeholder = "Phone number 2"/>
                    
                        {/* <TextInput
                            style = {styles.input}
                            secureTextEntry = {true}
                            onChangeText = {(cur_pwd)=>this.setState({cur_pwd})}
                            placeholder = "Current password"/> */}
                        <Button
                            onPress = {this.update}
                            // buttonStyle = {this.state.cur_pwd?{marginTop:20, width:DEVICE_WIDTH - 40, backgroundColor:color.dark_primary}:{marginTop:20, width:DEVICE_WIDTH - 40}}
                            buttonStyle = {{marginTop:20, width:DEVICE_WIDTH - 40, backgroundColor:color.dark_primary}}
                            title='UPDATE'
                        />
                         {this.state.phoneverified=="N"&&               
                        <TouchableOpacity style = {{marginTop:20}} onPress = {this.navigate}>
                            <Text style = {{color:'blue'}}>Phone Verify Now</Text>
                        </TouchableOpacity>}
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    header:{
        flex:1,
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
    },
    inputArea:{
        flex:1
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255,1)',
        width: DEVICE_WIDTH - 40,
        height: 30,
        paddingLeft:5,
        color: "#000",
        borderColor:color.font,
        borderBottomWidth:1,
        marginTop:15
      },
});

function mapStateToProps(state){
    return{
        auth:state.authReducer,
        user:state.userReducer.user,
        userReducer:state.userReducer,
        image:state.imageReducer.image,
        imageReducer:state.imageReducer
    }
}

export default connect(mapStateToProps)(ProfileUpdateView)
