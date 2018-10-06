import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../redux/request/action'
import actActions from '../../redux/activity/action'
import { color, constants } from '../../settings/appconfig'
import Dimensions from 'Dimensions'
import { getCurrentTimeStamp } from '../../helpers/utility'
import Spinner from 'react-native-loading-spinner-overlay'

const DEVICE_WIDTH = Dimensions.get('window').width;

class AddRequest extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props)
    this.inputRefs = {};
    this.state={
      selected:0,
      summary:'',
      result:'',
      actId: this.props.navigation.getParam('C_Activity_ID'),
      recId: this.props.navigation.getParam('Record_ID')
    }
    this.addRequest = this.addRequest.bind(this)
  }

  componentDidMount() {
    const data = {
      IsActive: 'Y',
      isLandlord: 'Y',
      "AD_Client_ID": this.props.user.AD_User_ID
    }
    

    
    const param = {
      C_Activity_ID: this.state.actId
    }
    this.props.dispatch(actions.getReqType(data))
    this.props.dispatch(actActions.getActivity(param));
  }

  addRequest(){
    const date = getCurrentTimeStamp();
    const data = {
      AD_Client_ID: this.props.user.AD_User_ID,
      AD_User_ID: this.props.user.AD_User_ID,
      CreatedBy: this.props.user.AD_User_ID,
      UpdatedBy: this.props.user.AD_User_ID,
      IsActive: 'Y',
      IsOpen: 'Y',
      R_StatusCategory_ID: this.props.requestType[this.state.selected].R_StatusCategory_ID,
      R_RequestType_ID: this.props.requestType[this.state.selected].R_RequestType_ID ,
      Result: this.state.result,
      Summary: this.state.summary,
      SalesRep_ID: this.props.act[0].SalesRep_ID,
      C_BPartner_ID: this.props.user.C_BPartner,
      C_Activity_ID: this.state.actId,
      XX_Unit_ID: this.state.recId,
      Record_ID: this.state.recId,
      AD_Table_ID: constants.tableId,
      DateNextAction: date,
      AD_Org_ID: constants.AD_Org_ID


    }

    console.log("target~~`", data)
    this.props.dispatch(actions.getReqStatusID(data) )
  }

  
  componentWillReceiveProps(nextProps) {

    
  }
  
  
  render() {
    const {goBack} = this.props.navigation;
    return (
      
      <View style = {styles.container}>
        {/* <Spinner visible={this.props.reqReducer.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} /> */}
        <View style = {styles.header}>
                <TouchableOpacity onPress = {()=>goBack()}>
                    <Icon
                        type = 'ionicon'
                        name = 'ios-arrow-back'
                        size = {25}
                        color = {color.dark_primary}
                    />    
                </TouchableOpacity>
                
            <View style = {{flex:5, alignItems:"center", justifyContent:"center"}}>
                <Text style = {{fontSize:25,color:'white', fontWeight:'bold'}}> Add New Request </Text>
            </View>
            
        </View>
        <View style = {styles.body}>
          <View style = {{marginTop: 20}}>
            <Text style = {{paddingVertical:5, fontSize:15}}>Request Type : </Text>
            <RNPickerSelect
              placeholder={{
                  label: 'Select a request type...',
                  value: null,
              }}
              items={this.props.requestType}
              onValueChange={(value) => {
                  this.setState({
                      selected: value,
                  });
              }}
              style={{...styles}}
              value={this.state.selected}
              ref={(el) => {
                  this.inputRefs.picker = el;
              }}
            />
            
          </View>
          <View style = {{marginTop: 10}}>
            <Text style = {{paddingVertical:5, fontSize:15}}>Summary : </Text>
            <TextInput
              placeholder = "summary"
              style = {styles.inputIOS}
              onChangeText = {(summary)=>this.setState({summary})}
            />
          </View>
          <View style = {{marginTop: 10}}>
            <Text style = {{paddingVertical:5, fontSize:15}}>Result : </Text>
            <TextInput
              placeholder = "result"
              style = {styles.inputIOS}
              onChangeText={(result)=>this.setState({result})}
            />
          </View>
          <View style = {{marginTop: 10}}>
            <TouchableOpacity
              style = {{backgroundColor: color.dark_primary, justifyContent: 'center', alignItems: 'center', paddingVertical: 13, borderRadius: 5}}
              onPress = {this.addRequest}
            >
              <Text style = {{color: '#fff', fontSize: 16}}>Add New Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
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
  user: state.userReducer.user,
  requestType: state.reqReducer.reqtype,
  act: state.actReducer.activity,
  reqReducer: state.reqReducer
})


export default connect(mapStateToProps)(AddRequest)
