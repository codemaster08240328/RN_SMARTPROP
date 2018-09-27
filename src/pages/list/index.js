import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import { color, constants } from '../../settings/appconfig'
import MenuView from '../menu'
import { convertTimeFormat } from '../../helpers/utility'
import Spinner from 'react-native-loading-spinner-overlay'
import SideMenu from 'react-native-side-menu'
import Dimensions from 'Dimensions'
import actions from '../../redux/list/action';
const DEVICE_WIDTH = Dimensions.get('window').width;

class ListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen:false,
      length:1
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
  }

  componentDidMount(){
    const data = {
      CreatedBy: "1000085",//constants.createdBy,
      XX_Lov_ListingType_ID: "1000000",//this.props.user.C_BPartner_ID,
      XX_Lov_ListingStatus_ID: "1000000",//this.props.user.AD_User_ID,
      XX_Lov_UnitStatus_ID: '1000000'
    }
    this.props.dispatch(actions.getList(data));
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

  _renderItem = (item)=>{
    return(
      <View style = {{width:DEVICE_WIDTH-15, padding:10}}>
        <View style = {styles.content}>
          
          <View style = {styles.odd_row}>
            <Text style = {styles.title}>Created : </Text>
            <Text>{convertTimeFormat(item.Created)}</Text>
          </View>
          <View style = {styles.even_row}>
            <Text style = {styles.title}>Name : </Text>
            <Text>{item.Name}</Text>
          </View>
          <View style = {styles.odd_row}>
            <Text style = {styles.title}>FurnitureStatus : </Text>
            <Text>{item.XX_Lov_FurnitureStatus_ID}</Text>
          </View>
          <View style = {styles.even_row}>
            <Text style = {styles.title}>ListingType : </Text>
            <Text>{item.XX_Lov_ListingType_ID}</Text>
          </View>
          <View style = {styles.odd_row}>
            <Text style = {styles.title}>ListingStatus : </Text>
            <Text>{item.XX_Lov_ListingStatus_ID}</Text>
          </View>
          <View style = {styles.even_row}>
            <Text style = {styles.title}>UnitStatus : </Text>
            <Text>{item.XX_Lov_UnitStatus_ID}</Text>
          </View>
          <View style = {styles.odd_row}>
            <Text style = {styles.title}>Date Available : </Text>
            <Text>{convertTimeFormat(item.date_available)}</Text>
          </View>
          <View style = {styles.even_row}>
            <Text style = {styles.title}>Price Asking : </Text>
            <Text>{item.price_asking}</Text>
          </View>
          <View style = {styles.odd_row}>
            <Text style = {styles.title}>Unit : </Text>
            <Text>{item.XX_Unit_ID}</Text>
          </View>
          <View style = {styles.even_row}>
            <Text style = {styles.title}>Property : </Text>
            <Text>{item.XX_Property_ID}</Text>
          </View>
          <View style = {styles.odd_row}>
            <Text style = {styles.title}>ListingPrivacy : </Text>
            <Text>{item.XX_Lov_ListingPrivacy_ID}</Text>
          </View>

        </View>
        <View style = {styles.foot}>
          <Text style = {{color: color.font}}>You have {this.props.list.length} requests</Text>
          {
            this.props.list.length > 1 && <Text style = {{color: color.font}}>To see your other request swipe screen</Text>
          }
          
        </View>
      </View>
    )
  }

  render() {
    const menu = <MenuView 
                  onItemSelected={this.onMenuItemSelected}
                  {...this.props} 
                  backBtn = {()=>this.setState({isOpen:false})}
                />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        menuPosition="left"
        onChange={isOpen => this.updateMenuState(isOpen)}
        openMenuOffset={DEVICE_WIDTH}
        >
        <View style = {styles.container}>
          <Spinner visible={false} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
          <View style={styles.header}>
            <TouchableOpacity onPress={this.toggleSideMenu}>
                <Icon
                    type='entypo'
                    name='dots-three-vertical'
                    size={25}
                    color={color.dark_primary}
                />    
            </TouchableOpacity>
            <View style={{flex:5, alignItems:"center", justifyContent:"center"}}>
                <Text style={{fontSize:25, color:'white', fontWeight:'bold'}}> My Lists </Text>
            </View>
          </View>

          <View style = {styles.body}>
            <FlatList
              horizontal={true}
              data={this.props.list}
              extraData={this.state}
              renderItem={({item})=>this._renderItem(item)}
            />
          </View>
        </View>
      </SideMenu>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff'
  },
  header:{
    flex:1,
    backgroundColor: color.light_primary,
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: 'center',
    paddingTop: 15,
  },
  body:{
    flex: 11,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  content:{
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#d5d5dc",
    flex:10
  },
  odd_row:{
    backgroundColor:'#e6e6ed',
    alignItems:"center",
    flexDirection:'row',
    flex:1,
    paddingLeft:15
  },
  even_row:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15
  },
  title:{
    color: color.font,
    fontSize: 15
  },
  foot:{
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#d5d5dc",
    flex: 1,
    justifyContent:"center",
    alignItems:'center',
    marginTop:10
  }
})


const mapStateToProps = (state) => ({
  state:state,
  user:state.userReducer.user,
  unit:state.unitReducer.unit,
  list:state.listReducer.list
})

export default connect(mapStateToProps)(ListView)
