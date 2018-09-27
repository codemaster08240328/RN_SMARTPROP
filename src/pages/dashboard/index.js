import React,{ Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon, Avatar } from 'react-native-elements';
import { color } from '../../settings/appconfig';
import avatar from '../../../assets/avatar.png';
import actions from '../../redux/image/action';
import Spinner from 'react-native-loading-spinner-overlay';
import{ connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import MenuView from '../menu';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;


import GridView from 'react-native-super-grid';

class DashBoardView extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen:false
        }
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    }
    componentDidMount(){
        data = {
            AD_Image_ID:this.props.user.AD_Image_ID
        }
        this.props.dispatch(actions.getImageData(data));
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

    render(){
        const items = [
            { title: 'REQUESTS', code: '#1abc9c', type:'octicon', name:'git-pull-request' }, { title: 'FAV UNITS', code: '#2ecc71', type:'ionicon', name:'ios-heart' },
            { title: 'FAV ACTIVITY', code: '#3498db', type:'feather', name:'activity' }, { title: 'FAV TYPE', code: '#9b59b6', type:'feather', name:'aperture' },
            { title: 'FAV CATEGORY', code: '#34495e', type:'feather', name:'grid' }, { title: 'STATUS', code: '#16a085', type:'font-awesome', name:'spinner' }
        ];
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
                <Spinner visible={this.props.imageReducer.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <View style = {styles.header}>
                    <View style = {{flex:1, justifyContent:"center", paddingLeft:5}}>
                        <TouchableOpacity onPress = {this.toggleSideMenu}>
                            <Icon
                                type = 'entypo'
                                name = 'menu'
                                size = {25}
                                color = {color.dark_primary}
                            />    
                        </TouchableOpacity>
                        
                    </View>
                    <View style = {{flex:2}}></View>
                    <View style = {{flex:5, alignItems:"center", justifyContent:"center"}}>
                        <Text style = {{fontSize:25,color:'white', fontWeight:'bold'}}> DashBoard </Text>
                    </View>
                    <View style = {{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                        <Icon
                            type = 'ionicon'
                            name = 'ios-notifications-outline'
                            color = {color.font}
                            size = {25}
                        />
                    </View>
                    <View style = {{flex:2, justifyContent:'center', alignItems:'center'}}>
                        <Avatar
                            size="small"
                            rounded
                            source={(!this.props.imageReducer.image||this.props.imageReducer.image.BinaryData=="")?avatar:{uri:`data:image/gif;base64,${this.props.imageReducer.image.BinaryData}`}}
                            onPress={() => this.props.navigation.navigate("profile")}
                            activeOpacity={0.7}
                            />
                    </View>
                </View>
                <View style = {styles.body}>
                    <GridView
                        itemDimension={100}
                        items={items}
                        style={styles.gridView}
                        spacing = {30}
                        renderItem={item => (
                        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                            <TouchableOpacity style = {{flex:1}}>
                                <View style = {{flex:4, justifyContent:'center', alignItems:'center'}}>
                                    <Icon
                                        type = {item.type}
                                        name = {item.name}
                                        color = 'white'
                                        size = {60}
                                    />
                                </View>
                                <View style = {{flex:1, justifyContent:"flex-end"}}>
                                    <Text style={styles.itemName}>{item.title}</Text>
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                        )}
                    />

                </View>

            </View>
            </SideMenu>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'white',
    },
    header:{
        flex:1,
        backgroundColor:color.light_primary,
        flexDirection:"row",
        paddingTop:15


    },
    body:{
        flex:12
    },
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 160,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    
  });
function mapStateToProps(state){
    return{
        user:state.userReducer.user,
        imageReducer:state.imageReducer
    }
}

export default connect(mapStateToProps)(DashBoardView)