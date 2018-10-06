import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { 
  DocumentPicker, 
  DocumentPickerUtil 
} from 'react-native-document-picker';
import { color, constants } from '../../settings/appconfig'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../redux/unit/action'


class AddUnitDoc extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props)
  
    this.state = {
       title: '',
       msg: '',
       Record_ID:'',
       XX_Lov_Doc_Category_ID:'',
       BinaryData:'',
       test:'0.00'
    }
    this.fileUpload = this.fileUpload.bind(this)
    this.addRequest = this.addRequest.bind(this)
    this.click = this.click.bind(this)
  }

  click(msg){
    

  }
  
  componentDidMount() {
    const data = {}
    this.setState({Record_ID: this.props.navigation.getParam('Record_ID')})
    this.props.dispatch(actions.getDocCategory(data))
  }

  fileUpload(){
    DocumentPicker.show({
        filetype:[DocumentPickerUtil.images()],
    },(error,res) => {
        console.log('error',error);
        console.log(res.uri, res.type, res.fileName, res.fileSize);
    })  
  } 
  
  addRequest(){
    if(this.state.title==''||this.state.msg==''){
      alert('fill in all fields.');
      return
    }
    if(this.state.BinaryData!='')
      data = {
        AD_Org_ID: constants.AD_Org_ID,
        AD_Table_ID: constants.tableId,
        Record_ID: this.state.Record_ID,
        XX_Lov_Doc_Category_ID: this.state.XX_Lov_Doc_Category_ID,
        Title: '',
        BinaryData:this.state.BinaryData,
        TextMsg:''
      }
    else
      data = {
        AD_Org_ID: constants.AD_Org_ID,
        AD_Table_ID: constants.tableId,
        Record_ID: this.state.Record_ID,
        XX_Lov_Doc_Category_ID: this.state.XX_Lov_Doc_Category_ID,
        Title: this.state.title,
        TextMsg:this.state.msg
      }
    console.log(data);
    this.props.dispatch(actions.addUnitDoc(data))
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
                <Text style = {{fontSize:25,color:'white', fontWeight:'bold'}}> Add New Unit Document </Text>
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
              items={this.props.docCateg}
              onValueChange={(value) => {
                  this.setState({
                      XX_Lov_Doc_Category_ID: this.props.docCateg[value] ? this.props.docCateg[value].XX_Lov_Doc_Category_ID : "",
                  });
              }}
              style={{...styles}}
            />
            
          </View>
          <View style = {{marginTop: 10}}>
            <Text style = {{paddingVertical:5, fontSize:15}}>Title : </Text>
            <TextInput
              placeholder = "title"
              style = {styles.inputIOS}
              onChangeText = {(title)=>this.setState({title})}
            />
          </View>
          <View style = {{marginTop: 10}}>
            <Text style = {{paddingVertical:5, fontSize:15}}>FileUpload : </Text>
            <View style ={{flexDirection: 'row'}}>
              <TextInput
                placeholder = "upload file"
                style = {[styles.inputIOS, {flex: 6, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRightWidth: 0}]}
                // onChangeText={(result)=>this.setState({result})}
              />
              <TouchableOpacity 
                onPress={this.fileUpload}
                style={{
                  flex: 2, 
                  backgroundColor: color.dark_primary, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  borderTopRightRadius: 4, 
                  borderBottomRightRadius:4
                }}
              >
                <Text style={{color: 'white'}}>Upload</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <View style = {{marginTop: 10}}>
            <Text style = {{paddingVertical:5, fontSize:15}}>Text Message : </Text>
            <TextInput
              multiline
              placeholder = "message here"
              style = {[styles.inputIOS, {height: 100}]}
              onChangeText={(msg)=>this.setState({msg})}
            />
          </View>

          <View style = {{marginTop: 10}}>
            <TouchableOpacity
              style = {{backgroundColor: color.dark_primary, justifyContent: 'center', alignItems: 'center', paddingVertical: 13, borderRadius: 5}}
              onPress = {this.addRequest}
            >
              <Text style = {{color: '#fff', fontSize: 16}}>Add New Unit Document</Text>
            </TouchableOpacity>
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
  state:state,
  user: state.userReducer.user,
  docCateg: state.unitReducer.docCategory,
  act: state.actReducer.activity,
  reqReducer: state.reqReducer

})

export default connect(mapStateToProps)(AddUnitDoc)
