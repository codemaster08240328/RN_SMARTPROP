import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { color } from '../../settings/appconfig';
import MenuView from '../menu'
import Spinner from 'react-native-loading-spinner-overlay';
import SideMenu from 'react-native-side-menu';
import Dimensions from 'Dimensions';
import actions from '../../redux/unit/action';

const DEVICE_WIDTH = Dimensions.get('window').width;


class UnitView extends Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            data : [{Name:'name1', C_Activity_ID:'Activity_ID', prop_block:"prop_block", XX_Property_ID:'prop_id', },{Name:'name1', C_Activity_ID:'Activity_ID', prop_block:"prop_block", XX_Property_ID:'prop_id'},{Name:'name1', C_Activity_ID:'Activity_ID', prop_block:"prop_block", XX_Property_ID:'prop_id'}]
        }
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    }

    componentDidMount(){
        const data = {
            refereduser_ID:'1000959',//this.props.user.AD_User_ID,
            AD_Table_ID:'1000015',
        }
        this.props.dispatch(actions.getUnit(data));
    }

    _keyExtractor = (item, index) => item.id;

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

    render(){
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
                    <Spinner visible={false} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                    <View style = {styles.header}>
                        <View style = {{flex:1, justifyContent:"center", paddingLeft:5}}>
                            <TouchableOpacity onPress = {this.toggleSideMenu}>
                                <Icon
                                    type = 'entypo'
                                    name = 'dots-three-vertical'
                                    size = {25}
                                    color = {color.dark_primary}
                                />    
                            </TouchableOpacity>
                            
                        </View>
                        <View style = {{flex:2}}></View>
                        <View style = {{flex:5, alignItems:"center", justifyContent:"center"}}>
                            <Text style = {{fontSize:25,color:'white', fontWeight:'bold'}}> My Units </Text>
                        </View>
                        <View style = {{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                            
                        </View>
                        <View style = {{flex:2, justifyContent:'center', alignItems:'center'}}>
                            
                        </View>
                    </View>
                    <View style = {styles.body}>
                        <FlatList
                            data = {this.props.unit}
                            extraData = {this.state}
                            keyExtractor = {this._keyExtractor}
                            renderItem = {({item})=>
                            <View style = {{
                                    paddingHorizontal:10,
                                    paddingVertical:5, 
                                    height:80, 
                                    marginTop:10,
                                    borderRadius:5,
                                    borderWidth:0.5,
                                    borderColor:'#d5d5dc',
                                    backgroundColor:'#e6e6ed'
                                }}>
                                <View style = {{flexDirection:"row", justifyContent:'space-between', height:'40%'}}>
                                    <Text style={{fontSize:20}}>Name : {item.Name}</Text>
                                    <TouchableOpacity>
                                        <Icon
                                            size = {20}
                                            type = 'entypo'
                                            name = 'dots-three-horizontal'
                                        />  
                                    </TouchableOpacity>
                                </View>
                                <View style = {{flexDirection:"row", justifyContent:'space-between', height:'30%'}}>
                                    <Text>Record ID : {item.Record_ID}</Text>
                                    <Text>Prop Block : {item.prop_block}</Text>
                                </View>
                                <View style = {{flexDirection:"row", justifyContent:'space-between', height:'30%'}}>
                                    <Text>Property Name : {item.XX_Property_ID}</Text>
                                    <Text>Activity ID : {item.C_Activity_ID}</Text>
                                </View>
                            </View>}
                        />
                    </View>
                </View>
            </SideMenu>
        )
    }
}

function mapStateToProps(state){
    return{
        user:state.userReducer.user,
        unit:state.unitReducer.unit,
        unitReducer:state.unitReducer
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
        backgroundColor:'#fff',
        paddingHorizontal:10
    }
});

export default connect(mapStateToProps)(UnitView)