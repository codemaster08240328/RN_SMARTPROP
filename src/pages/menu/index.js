import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import Dimensions from 'Dimensions';
import { color } from '../../settings/appconfig';
const DEVICE_WIDTH = Dimensions.get('window').width;
class MenuView extends Component{
    
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <View style={{flex:1, justifyContent:"center"}}>
                        <TouchableOpacity onPress={()=>this.props.backBtn()}>
                            <Icon type = 'entypo' name = 'chevron-left' color = 'white' size ={25}/>    
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex:2}}></View>
                    <View style = {{flex:5,justifyContent:"center", alignItems:'center'}}>
                        <Text style = {{color:'white', fontSize:25, fontWeight:'bold'}}>Menu</Text>
                    </View>
                    <View style = {{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                        {/* <Icon
                            type = 'ionicon'
                            name = 'ios-notifications-outline'
                            color = {color.font}
                            size = {25}
                        /> */}
                    </View>
                    <View style = {{flex:2, justifyContent:'center', alignItems:'center'}}>
                        {/* <Avatar
                            size="small"
                            rounded
                            source={(!this.props.imageReducer.image||this.props.imageReducer.image.BinaryData=="")?avatar:{uri:`data:image/gif;base64,${this.props.imageReducer.image.BinaryData}`}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            /> */}
                    </View>
                </View>
                <View style = {styles.body}>
                    <View style = {{height:280}}>
                        <TouchableOpacity 
                            style = {{flex:1}} 
                            onPress = {()=>{this.props.onItemSelected("dashboard")}}>

                            <View style = {{flex:1, flexDirection:'row', padding:10}}>
                                <View style = {{flex:3, height:50}}>
                                    <Icon
                                        type = 'entypo'
                                        name = 'home'
                                        size = {50}
                                        color = {color.dark_primary}/>
                                </View>
                                <View style = {{flex:10, height:50, justifyContent:'center'}}>
                                    <Text style = {{fontSize:18, color:color.font}}>DashBoard</Text>
                                    <Text style = {{fontSize:13, color:color.font}}>Request, Fav Request, Activity ...</Text>
                                </View>                
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style = {{flex:1}} 
                            onPress = {()=>{this.props.onItemSelected("unit")}}>

                            <View style = {{flex:1, flexDirection:'row', padding:10}}>
                                <View style = {{flex:3,  height:50}}>
                                    <Icon
                                        type = 'simple-line-icon'
                                        name = 'wallet'
                                        size = {45}
                                        color = {color.dark_primary}
                                    />
                                </View>
                                <View style = {{flex:10, height:50, justifyContent:'center'}}>
                                    <Text style = {{fontSize:18, color:color.font}}>My Units</Text>
                                    <Text style = {{fontSize:13, color:color.font}}>unit documents, unit ledger, add/edit ... </Text>
                                </View>                
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style = {{flex:1}}
                            onPress = {()=>{this.props.onItemSelected('list')}}
                        >
                            <View style = {{flex:1, flexDirection:'row', padding:10}}>
                                <View style = {{flex:3, height:50}}>
                                    <Icon
                                        type = 'ionicon'
                                        name = 'md-list-box'
                                        size = {48}
                                        color = {color.dark_primary}
                                    />
                                </View>
                                <View style = {{flex:10, height:50, justifyContent:'center'}}>
                                    <Text style = {{fontSize:18, color:color.font}}>My Lists</Text>
                                    <Text style = {{fontSize:13, color:color.font}}>add/update/edit ...</Text>
                                </View>                
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style = {{flex:1}} 
                            onPress = {()=>{this.props.onItemSelected("request")}}>
                            
                            <View style = {{flex:1, flexDirection:'row', padding:10}}>
                                <View style = {{flex:3, height:50}}>
                                    <Icon
                                        type = 'entypo'
                                        name = 'direction'
                                        size = {48}
                                        color = {color.dark_primary}/>
                                </View>
                                <View style = {{flex:10, height:50, justifyContent:'center'}}>
                                    <Text style = {{fontSize:18, color:color.font}}>My Requests</Text>
                                    <Text style = {{fontSize:13, color:color.font}}>add/update/edit ...</Text>
                                </View>                
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:DEVICE_WIDTH
    },
    header:{
        flex:1,
        backgroundColor:color.light_primary,
        flexDirection:"row",
        paddingTop:15
    },
    body:{
        flex:12
    }
});

function mapStateToProps(state){
    return{
        user:state.userReducer.user,
        imageReducer:state.imageReducer
    }
}

export default connect(mapStateToProps)(MenuView)
