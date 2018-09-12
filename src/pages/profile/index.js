import React, {Component} from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Avatar from '../../components/Avatar';

import {connect} from 'react-redux';
import Dimensions from 'Dimensions';
import { color } from '../../settings/appconfig';
import avatar from '../../../assets/avatar.png';
import { colors } from '../auth/components/style';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class ProfileView extends Component{

    constructor(props){
        super(props);
        this.state={
            data:[{title: 'Occupation', content:'Not configured'}, {title: 'Mobile',content:'506367251'},{title: 'Email', content:'Not configured'}, {title: 'Language',content:'Not configured'},{title: 'Hobbies', content:'Not configured'}, {title: 'Personal Website/Blog',content:'Not configured'},{title: 'Social Network', content:'Not configured'}]
        }
        this._renderItem = this._renderItem.bind(this)
    }

    _renderItem(item){
        return(
            <View style = {{flex:1, flexDirection:'row', paddingTop:18,paddingBottom:18, borderBottomWidth:1,borderColor:'#EEEFEE'}}>
                <Text style = {{fontWeight:'bold', fontSize:16}}>{item.title}: </Text><Text style={{fontSize:16}}>{item.content}</Text>          
            </View>
        )
    }

    render(){
        const {goBack} = this.props.navigation;

        return(
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <TouchableOpacity onPress={()=>goBack()}>
                        <Icon type = 'entypo' name = 'chevron-left' color = 'white' size ={25}/>    
                    </TouchableOpacity>
                    <Text style = {{color:'#fff', fontSize:20, paddingLeft:10}}>My Profile</Text>
                </View>
                <View style = {{flex:1.5, backgroundColor:color.light_primary, flexDirection:'row', paddingLeft:15, paddingRight:15, paddingBottom:6}}>
                    <View style={{flex:1}}>
                        <Avatar
                            size="medium"
                            rounded
                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            />
                    </View>
                    
                    <View style={{flex:3, paddingTop:11}}>
                        <Text style = {{fontSize:18, color:'#fff'}}> Habib Salhi </Text>
                        <Text style = {{fontSize:14, color:'#fff'}}> 216 </Text>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity>
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
                    <FlatList
                          data={this.state.data}
                          renderItem={({item}) => this._renderItem(item)}
                    />
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
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
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#fff'
    }
});

function mapStateToProps(state){
    return{
        state
    }
}

export default connect(mapStateToProps)(ProfileView)
