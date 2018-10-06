import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import PDFView from 'react-native-view-pdf'
import { connect } from 'react-redux'
import { color, constants } from '../../settings/appconfig';
import MenuView from '../menu'
import Spinner from 'react-native-loading-spinner-overlay';
import { 
    DocumentPicker, 
    DocumentPickerUtil 
} from 'react-native-document-picker';
import SideMenu from 'react-native-side-menu';
import Dimensions from 'Dimensions';
import actions from '../../redux/unit/action';
import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';




const DEVICE_WIDTH = Dimensions.get('window').width;


class UnitView extends Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen : false,
            selectedUnit : 'Please select one of Units.'
        }
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
        this._renderItem = this._renderItem.bind(this)
        this._renderUnitItem = this._renderUnitItem.bind(this)
        this.unitClick = this.unitClick.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.dotBtnPress = this.dotBtnPress.bind(this)
        this.viewDoc = this.viewDoc.bind(this)
    }

    dotBtnPress(value, item){
        const param = {
            C_Activity_ID: item.C_Activity_ID,
            Record_ID: item.Record_ID
        }
        this.props.navigation.navigate(value, param)
    }

    fileUpload(){
        DocumentPicker.show({
            filetype:[DocumentPickerUtil.images()],
        },(error,res) => {
            console.log('error',error);
            console.log(res.uri, res.type, res.fileName, res.fileSize);
        })
    }

    componentDidMount(){
        const data = {
            refereduser_ID:'1000959',//this.props.user.AD_User_ID,
            AD_Table_ID: constants.tableId,
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

    unitClick(item){
        const data = {
            "AD_Table_ID" : constants.tableId,
            'Record_ID' : item.Record_ID
        }
        this.setState({selectedUnit: item.Name});
        this.props.dispatch(actions.getUnitDoc(data))
    }

    _renderItem(item){
        return(
            <TouchableOpacity 
                onPress = {()=>this.unitClick(item)}
                style = {{
                    paddingHorizontal:10,
                    paddingVertical:5, 
                    height:80, 
                    marginTop:10,
                    borderRadius:5,
                    borderWidth:0.5,
                    borderColor:item.Name == this.state.selectedUnit ? "red":'#d5d5dc',
                    backgroundColor:'#e6e6ed'
                }}
            >
                <View style = {{flexDirection:"row", justifyContent:'space-between', height:'40%'}}>
                    <Text style={{fontSize:20}}>Unit : {item.Name}</Text>
                    <Menu onSelect={(value) => this.dotBtnPress(value, item)} >
                        <MenuTrigger>
                            <Icon
                                size = {25}
                                type = 'entypo'
                                name = 'dots-three-horizontal'
                            />  
                        </MenuTrigger>
                        <MenuOptions customStyles={{ optionText: styles.text,optionsContainer:styles.menuOption,optionsWrapper:styles.menuOptionsWrapper }}>
                            <MenuOption value="addRequest" style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:'#727272',padding:10,borderTopWidth:1, borderRightWidth:1, borderLeftWidth:1}}>
                                <Icon type="entypo" name="add-to-list" color="#EB6F6F" size={15}/>
                                <Text style={{color: '#EB6F6F', marginLeft:10}}>ADD NEW REQUEST</Text>
                            </MenuOption>
                            <MenuOption value="addUnitDoc" style={{flex:1,flexDirection:'row', borderBottomWidth:1,borderColor:'#727272',padding:10, borderRightWidth:1, borderLeftWidth:1}}>
                                <Icon type="entypo" name="add-to-list" color="#EB6F6F" size={15}/>
                                <Text style={{color: '#EB6F6F', marginLeft:10}}>ADD NEW UNIT DOCUMENT</Text>
                            </MenuOption>
                            <MenuOption value="unitLedger" style={{flex:1,flexDirection:'row', borderBottomWidth:1,borderColor:'#727272',padding:10, borderRightWidth:1, borderLeftWidth:1}}>
                                <Icon type="entypo" name="add-to-list" color="#EB6F6F" size={15}/>
                                <Text style={{color: '#EB6F6F', marginLeft:10}}>VIEW LEDGER</Text>
                            </MenuOption>
                            <MenuOption value="addListing" style={{flex:1,flexDirection:'row', borderBottomWidth:1,borderColor:'#727272',padding:10, borderRightWidth:1, borderLeftWidth:1}}>
                                <Icon type="entypo" name="add-to-list" color="#EB6F6F" size={15}/>
                                <Text style={{color: '#EB6F6F', marginLeft:10}}>ADD NEW LISTING</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
                <View style = {{flexDirection:"row", justifyContent:'space-between', height:'30%'}}>
                    <Text style = {{color:color.font}}>Property Name : {item.XX_Property_ID}</Text>
                </View>
                <View style = {{flexDirection:"row", justifyContent:'space-between', height:'30%'}}>
                    <Text style = {{color:color.font}}>Prop Block : {item.prop_block}</Text>
                    <Text style = {{color:color.font}}>Area(Sq.Ft) : {item.area_gross}</Text>
                </View>
            </TouchableOpacity>
        )
        
    }

    viewDoc(){
        this.props.navigation.navigate('viewdoc');
    }

    
    
    _renderUnitItem(item){
        return(
            <View style = {{
                paddingHorizontal:10,
                paddingVertical:5, 
                height:60, 
                marginTop:10,
                borderRadius:5,
                borderWidth:0.5,
                borderColor:'#d5d5dc',
                backgroundColor:'#e6e6ed',
                marginLeft:10,
                marginRight:10
            }}>
                <View style = {{flexDirection:"row", justifyContent:'space-between', height:'60%'}}>
                    <Text style={{fontSize:15}}>Title : {item.Title}</Text>
                    <TouchableOpacity onPress = {this.viewDoc}>
                        <Icon
                            size = {20}
                            type = 'entypo'
                            name = 'dots-three-horizontal'
                        />  
                    </TouchableOpacity>
                </View>
                <View style = {{flexDirection:"row", justifyContent:'space-between', height:'40%'}}>
                    <Text style = {{fontSize: 12, color: color.font}}>TextMsg : {item.TextMsg}</Text>
                    <Text style = {{fontSize: 12, color: color.font}}>Category : {item.XX_Lov_Doc_Category}</Text>
                </View>
            </View>
        );
        
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
                <MenuProvider>
                    <View style = {styles.container}>
                        <Spinner visible={false} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                        <View style = {styles.header}>
                                <TouchableOpacity onPress = {this.toggleSideMenu}>
                                    <Icon
                                        type = 'entypo'
                                        name = 'menu'
                                        size = {25}
                                        color = {color.dark_primary}
                                    />    
                                </TouchableOpacity>
                                
                            <View style = {{flex:5, alignItems:"center", justifyContent:"center"}}>
                                <Text style = {{fontSize:25,color:'white', fontWeight:'bold'}}> My Units </Text>
                            </View>
                            
                        </View>
                        <View style = {styles.body}>
                            <View style = {{flex:3, paddingBottom:10}}>
                                <FlatList
                                    data = {this.props.unit}
                                    extraData = {this.state}
                                    keyExtractor = {this._keyExtractor}
                                    renderItem = {({item})=>this._renderItem(item)}
                                />
                            </View>
                            <View style = {{flex:4, borderColor:"#d5d5dc", borderRadius:5, borderWidth:0.5}}>
                                <View style = {{height:40, backgroundColor:'#e6e6ed', borderBottomWidth:0.5, borderColor:"#d5d5dc", justifyContent:"center",width:'100%'}}>
                                    <Text style = {{paddingHorizontal:15}}>Documents - {this.state.selectedUnit}</Text>
                                </View>
                                {this.props.doc.length == 0 && <Text style = {{marginTop:10, textAlign:'center'}}>There is no documents to show.</Text>}
                                <FlatList
                                    data = {this.props.doc}
                                    extraData = {this.state}
                                    keyExtractor = {this._keyExtractor}
                                    renderItem = {({item})=>this._renderUnitItem(item)}
                                />
                            </View>
                        </View>
                    </View>
                </MenuProvider>
            </SideMenu>
        )
    }
}

function mapStateToProps(state){
    return{
        user:state.userReducer.user,
        unit:state.unitReducer.unit,
        unitReducer:state.unitReducer,
        doc:state.unitReducer.doc
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
        paddingLeft:10,
        alignItems:'center',
        paddingTop:15,
    },
    body:{
        flex:11,
        backgroundColor:'#fff',
        paddingHorizontal:10,
        paddingBottom:10
    },
    text: {
        fontSize: 18,
    },
    menuOption:{
        width:250,
        position:'absolute',
        zIndex:100,
    }
});

export default connect(mapStateToProps)(UnitView)