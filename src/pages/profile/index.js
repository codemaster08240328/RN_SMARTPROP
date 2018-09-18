import React, {Component} from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Avatar from '../../components/Avatar';

import {connect} from 'react-redux';
import Dimensions from 'Dimensions';
import { color } from '../../settings/appconfig';
import avatar from '../../../assets/avatar.png';
import SideMenu from 'react-native-side-menu';
import MenuView from '../menu';

import { colors } from '../auth/components/style';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class ProfileView extends Component{

    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            data:[{title: 'UserID',content:this.props.user.Value},{title: 'Email', content:this.props.user.EMail},{title: 'Phone1',content:this.props.user.Phone},{title: 'Phone2',content:this.props.user.Phone2} ]
        }
        this.navigateVerify = this.navigateVerify.bind(this);
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    }
    onMenuItemSelected(item){
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
        this.props.navigation.navigate(item);
    }
    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }
    toggleSideMenu () {
        this.setState({
          isOpen: !this.state.isOpen
        })
    }
    navigateVerify(){
        data = {
            phoneNum:this.props.user.Phone
        }
        this.props.navigation.navigate('verify', data)
    }

    render(){
        const {goBack} = this.props.navigation;
        const menu = <MenuView onItemSelected={this.onMenuItemSelected} {...this.props} backBtn = {()=>this.setState({isOpen:false})}/>;

        return(
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                menuPosition="left"
                onChange={isOpen => this.updateMenuState(isOpen)}
                openMenuOffset = {DEVICE_WIDTH}
                
                >
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <View style = {{flex:1,justifyContent:'center'}}>
                        <TouchableOpacity onPress = {()=>goBack()}>
                            <Icon type = 'entypo' name = 'chevron-left' color = 'white' size ={25}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex:9, justifyContent:"center", alignItems:"center"}}>
                        <Text style = {{color:'#fff', fontSize:25, paddingLeft:10, fontWeight:'bold'}}>My Profile</Text>
                    </View>
                    <View style = {{flex:1}}>
                        <TouchableOpacity onPress = {this.toggleSideMenu}>
                            <Icon
                                type = 'entypo'
                                name = 'dots-three-vertical'
                                size = {25}
                                color = {color.dark_primary}
                            />    
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
                <View style = {{flex:1.5, backgroundColor:color.light_primary, flexDirection:'row', paddingLeft:15, paddingRight:15, paddingBottom:6}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Avatar
                            size="medium"
                            rounded
                            source={(this.props.image.BinaryData=="")?avatar:{uri:`data:image/gif;base64,${this.props.image.BinaryData}`}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            />
                    </View>
                    
                    <View style={{flex:3, paddingTop:11}}>
                        <Text style = {{fontSize:18, color:'#fff'}}> {this.props.user.Name} </Text>
                        <Text style = {{fontSize:14, color:'#fff'}}> {this.props.user.Value} </Text>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress = {()=>this.props.navigation.navigate('update')}>
                            <Icon
                                name='account-edit'
                                size={35}
                                color={color.dark_primary}
                                type = 'material-community'
                                />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.body}>
                    {this.props.user.phoneverified=="N"&&
                        <View style={{flex:1, backgroundColor:"#FFD401", flexDirection:'row'}}>
                            <View style={{flex:2, justifyContent:'center', alignItems:'flex-end', paddingRight:20}}>
                                <Icon
                                    name='cellphone-erase'
                                    size={25}
                                    color="#F4010B"
                                    type = 'material-community'
                                />componentDidMount() {
                                    
                                }
                            </View>
                            <View style = {{flex:8, justifyContent:'center'}}>
                                <Text style={{fontSize:15}}>Mobile Number is not Verified</Text>
                                <TouchableOpacity onPress={this.navigateVerify}><Text style = {{color:'blue'}}>Try now</Text></TouchableOpacity>
                            </View>
                        </View>
                    }
                    
                    <View style={{flex:5, marginLeft:15, marginRight:15}}>

                        <View style = {{flex:1, flexDirection:'row', alignItems:"center", borderBottomWidth:1,borderColor:'#EEEFEE'}}>
                            <Text style = {{fontWeight:'bold', fontSize:16}}>UserID: </Text><Text style={{fontSize:16}}>{this.props.user.Value}</Text>          
                        </View>
                        <View style = {{flex:1, flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderColor:'#EEEFEE'}}>
                            <Text style = {{fontWeight:'bold', fontSize:16}}>Email: </Text><Text style={{fontSize:16}}>{this.props.user.EMail}</Text>          
                        </View>
                        <View style = {{flex:1, flexDirection:'row', alignItems:"center", borderBottomWidth:1,borderColor:'#EEEFEE'}}>
                            <Text style = {{fontWeight:'bold', fontSize:16}}>Phone1: </Text><Text style={{fontSize:16}}>{this.props.user.Phone}</Text>          
                        </View>
                        <View style = {{flex:1, flexDirection:'row', alignItems:'center', borderBottomWidth:1,borderColor:'#EEEFEE'}}>
                            <Text style = {{fontWeight:'bold', fontSize:16}}>Phone2: </Text><Text style={{fontSize:16}}>{this.props.user.Phone2}</Text>          
                        </View>
                    </View>
                    <View style={{flex:5}}></View>
                    
                </View>
            </View>
        </SideMenu>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
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
        backgroundColor:'#fff'
    }
});

function mapStateToProps(state){
    return{
        auth:state.authReducer,
        image:state.imageReducer.image,
        user:state.userReducer.user
    }
}

export default connect(mapStateToProps)(ProfileView)
