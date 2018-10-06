import React, { Component } from 'react'
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../redux/list/action'
import action_unit from '../../redux/unit/action'
import { color, constants } from '../../settings/appconfig'
import { getCurrentTimeStamp } from '../../helpers/utility';


const listTypes = [
  { label: "Yearly", value: 1000000 }, 
  { label: "Monthly", value: 1000001 }, 
  { label: "Weekly", value: 1000002 }, 
  { label: "Daily", value: 1000003 },
]

const listStatus = [
  { label: "Available", value: 1000000 }, 
  { label: "Reserved", value: 1000001 }, 
  { label: "Blocked", value: 1000004 }, 
  { label: "Removed", value: 1000005 },
]

const listExclusivity = [
  { label: "Exclusive", value: 1000000 }, 
  { label: "non-Exclusive", value: 1000001 }, 
  { label: "Managed", value: 1000002 }, 
]

const unitStatus = [
  { label: "Vacant", value: 1000000 }, 
  { label: "Rented", value: 1000001 }, 
]

const furnitureStatus = [
  { label: "Furnished", value: 1000000 }, 
  { label: "unFurnished", value: 1000001 }, 
  { label: "Partially Furnished", value: 1000002 }, 
]

const listingPrivacy = [
  { label: "Shared With Broker" , value: 1000003}
]



class AddNewList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      unitID: '',
      listtypeID: '',

    }
  }

  
  componentDidMount() {
    this.setState({unitID: this.props.navigation.getParam('Record_ID')})
    const param = {
      AD_Org_ID: constants.AD_Org_ID,
      Record_ID: this.props.navigation.getParam('Record_ID')
    }
    console.log("param",param)

    this.props.dispatch(action_unit.getPropID(param));
    this.addList = this.addList.bind(this)
  }
  

  addList(){
    console.log(this.props)
    console.log(this.state)
    const param = {
      AD_Org_ID: constants.AD_Org_ID,
      CreatedBy: this.props.user.AD_User_ID,
      XX_Lov_ListingType_ID: this.state.XX_Lov_ListingType_ID,
      XX_Lov_ListingStatus_ID: this.state.XX_Lov_ListingStatus_ID,
      XX_Lov_ListingExclusivity_ID: this.state.XX_Lov_ListingExclusivity_ID,
      Name: this.state.Name,
      XX_Property_ID: this.state.XX_Property_ID,
      XX_Unit_ID: this.state.unitID,
      XX_Lov_UnitStatus_ID: this.state.XX_Lov_UnitStatus_ID,
      date_available: getCurrentTimeStamp(),
      price_asking: this.state.price,
      security_deposit: this.state.security_deposit,
      XX_Lov_FurnitureStatus_ID: this.state.XX_Lov_FurnitureStatus_ID,
      access_instructions: this.state.access_instructions,
      remarks: this.state.remarks,
      XX_Lov_ListingPrivacy_ID: this.state.XX_Lov_ListingPrivacy_ID
    }
    this.props.dispatch(actions.addList(param))
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({XX_Property_ID: nextProps.property.XX_Property_ID})

  }
  
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style = {styles.container}>
        {/* <Spinner visible={this.props.reqReducer.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} /> */}
        <View style = {styles.header}>
          <TouchableOpacity
            onPress={ () => goBack() }
          >
            <Icon
              type='ionicon'
              name='ios-arrow-back'
              size={25}
              color={color.dark_primary}
            />
          </TouchableOpacity>
                
          <View style = {{flex: 5, alignItems: "center", justifyContent: "center"}}>
              <Text style = {{fontSize: 25,color: 'white', fontWeight: 'bold'}}> Add New Listings </Text>
          </View>
            
        </View>
        <View style = {styles.body}>
          <View style = {{marginTop: 10, flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1, paddingRight: 5}}>
              <Text style = {{paddingVertical: 5, fontSize:15}}>Listing Type : </Text>
              <RNPickerSelect
                placeholder={{
                    label: 'Select a listing type...',
                    value: null,
                }}
                items={listTypes}
                onValueChange={(value) => {
                    this.setState({
                        XX_Lov_ListingType_ID: value
                    });
                }}
                style={{...styles}}
              />
            </View>
            <View style={{flex: 1, paddingLeft: 5}}>
              <Text style = {{paddingVertical: 5, fontSize: 15}}>Listing Status : </Text>
              <RNPickerSelect
                placeholder={{
                    label: 'Select a listing status...',
                    value: null,
                }}
                items={listStatus}
                onValueChange={(value) => {
                    this.setState({
                        XX_Lov_ListingStatus_ID: value
                    });
                }}
                style={{...styles}}
              />
            </View>
            
            
          </View>
          <View style = {{marginTop: 10, flex: 1}}>
            <Text style = {{paddingVertical: 5, fontSize: 15}}>Name : </Text>
            <TextInput
              placeholder = "name"
              style = {styles.inputIOS}
              onChangeText = {(Name)=>this.setState({Name})}
            />
          </View>
          <View style = {{marginTop: 10, flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1, paddingRight: 5}}>
              <Text style = {{paddingVertical:5, fontSize:15}}>Listing Exclusivity : </Text>
              <RNPickerSelect
                placeholder={{
                    label: 'Select a listing exclusivity...',
                    value: null,
                }}
                items={listExclusivity}
                onValueChange={(value) => {
                    this.setState({
                        XX_Lov_ListingExclusivity_ID: value
                    });
                }}
                style={{...styles}}
              />
            </View>
            <View style={{flex: 1, paddingLeft: 5}}>
              <Text style = {{paddingVertical:5, fontSize:15}}>Unit Status : </Text>
              <RNPickerSelect
                placeholder={{
                    label: 'Select a unit status...',
                    value: null,
                }}
                items={unitStatus}
                onValueChange={(value) => {
                    this.setState({
                        XX_Lov_UnitStatus_ID: value
                    });
                }}
                style={{...styles}}
              />
            </View>
            
            
          </View>
          <View style = {{marginTop: 10, flex: 1}}>
            <Text style = {{paddingVertical: 5, fontSize: 15}}>Price : </Text>
            <TextInput
              placeholder = "name"
              style = {styles.inputIOS}
              onChangeText = {(price)=>this.setState({price})}
            />
          </View>
          <View style = {{marginTop: 10, flexDirection: "row", flex: 1}}>
            <View style={{flex: 1, paddingRight: 5}}>
              <Text style = {{paddingVertical: 5, fontSize: 15}}>Security Deposit : </Text>
              <TextInput
                placeholder = "deposit"
                style = {styles.inputIOS}
                onChangeText = {(security_deposit)=>this.setState({security_deposit})}
              />
            </View>
            <View style = {{flex: 1, paddingLeft: 5}}>
              <Text style = {{paddingVertical:5, fontSize:15}}>Access Instructions : </Text>
              <TextInput
                placeholder = "instructions"
                style = {styles.inputIOS}
                onChangeText = {(access_instructions)=>this.setState({access_instructions})}
              />
            </View>
          </View>
          <View style={{marginTop: 10, flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, paddingRight: 5}}>
              <Text style = {{paddingVertical: 5, fontSize:15}}>Listing Privacy : </Text>
              <RNPickerSelect
                placeholder={{
                    label: 'Select a listing privacy...',
                    value: null,
                }}
                items={listingPrivacy}
                onValueChange={(value) => {
                    this.setState({
                        XX_Lov_ListingPrivacy_ID: value
                    });
                }}
                style={{...styles}}
              />
            </View>
            <View style={{flex: 1, paddingLeft: 5}}>
              <Text style = {{paddingVertical: 5, fontSize: 15}}>FurnitureStatus : </Text>
              <RNPickerSelect
                placeholder={{
                    label: 'Select a listing status...',
                    value: null,
                }}
                items={furnitureStatus}
                onValueChange={(value) => {
                    this.setState({
                        XX_Lov_FurnitureStatus_ID: value
                    });
                }}
                style={{...styles}}
              />
            </View>
          </View>
          <View style={{marginTop: 10, flex: 1}}>
            <Text style = {{paddingVertical: 5, fontSize: 15}}>Remarks : </Text>
            <TextInput
              placeholder = "remarks"
              style = {styles.inputIOS}
              onChangeText = {(title)=>this.setState({title})}
            />
          </View>

          <View style = {{marginTop: 10, flex: 1}}>
              <TouchableOpacity
                style={{backgroundColor: color.dark_primary, justifyContent: 'center', alignItems: 'center', paddingVertical: 13, borderRadius: 5}}
                onPress={this.addList}
              >
                <Text style = {{color: '#fff', fontSize: 16}}>Add New Listing</Text>
              </TouchableOpacity>
            {/* <TouchableOpacity
              style = {{backgroundColor: color.dark_primary, justifyContent: 'center', alignItems: 'center', paddingVertical: 13, borderRadius: 5}}
            >
              <Text style = {{color: '#fff', fontSize: 16}}>Add New Unit Document</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>)

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
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
},
})

const mapStateToProps = (state) => ({
  state: state,
  user: state.userReducer.user,
  property: state.unitReducer.property,
  listReducer: state.listReducer
})


export default connect(mapStateToProps)(AddNewList)
