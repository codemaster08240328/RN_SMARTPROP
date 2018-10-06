import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import { Text, View, StyleSheet } from 'react-native'
import PDFView from 'react-native-view-pdf';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../redux/unit/action'
import { constants } from '../../settings/appconfig'

const PdfContent = ({
  resource,
  resourceType,
  onLoad,
  onError,
}) => {
  const content = resourceType && resource ?
    (
      <PDFView
        fadeInDuration={250.0}
        style={styles.pdfView}
        resource={resource}
        resourceType={resourceType}
        onLoad={onLoad}
        onError={onError}
      />
    ) : (
      <View style={styles.noContent}>
        <Text style={styles.noContentText}>
          No resources
          {'\n'}
          Press one of the buttons above
        </Text>
        <Text style={styles.noContentSubText}>
          You are running the app in
          {__DEV__ ? 'DEV' : 'RELEASE'}
          mode
        </Text>
      </View>
    );

  return <View style={styles.content}>{content}</View>;
};

const getBase64 = (resp) => {
  console.log("resp===>",resp);
  const row = hex2bin(resp);
  return btoa(row);
}

const hex2bin = (hex) => {
  let bytes = [], str;

  for(let i=0; i< hex.length-1; i+=2)
      bytes.push(parseInt(hex.substr(i, 2), 16));

  return String.fromCharCode.apply(String, bytes);
}

class UnitLedger extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }


  
  componentDidMount() {
    const data = {
      AD_Org_ID: constants.Ledger_Org_ID,
      C_Activity_ID: this.props.navigation.getParam('C_Activity_ID'),
      XX_Unit_ID: this.props.navigation.getParam('Record_ID'),// "1000074",// 
      C_BPartner_ID: this.props.user.C_BPartner// "1000872"//
    }
    this.props.dispatch(actions.getUnitLedger(data));
  }

  handleLoad = () => {
    // Alert.alert(
    //   'Document loaded',
    //   `Time: ${((new Date()).getTime() - this.renderStarted)}`,
    //   [
    //     { text: 'Cancel', style: 'cancel' },
    //     { text: 'OK' },
    //   ],
    // );
  }

  handleError = (error) => {
    alert(
      'Document loading failed' + error.message
    );
  }
  
  render() {
    const { resource, resourceType } = this.state;
    this.renderStarted = (new Date()).getTime();

    return (
      <View style={styles.container}>
        {this.props.ledger&&
        <PdfContent
          resource={getBase64(this.props.ledger.pdfContent)}
          resourceType="base64"
          onLoad={this.handleLoad}
          onError={this.handleError}
        />}
      </View>
    )
  }
}

const cWhite = '#f9f9f9';
const cLightBlue = '#5bc0de';
const cGreen = '#5cb85c';
const cBlue = '#428bca';
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: cWhite,
  },
  tabs: { flexDirection: 'row' },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cLightBlue,
    borderColor: cBlue,
    borderWidth: 2,
  },
  content: { flex: 1, backgroundColor: cGreen },
  pdfView: { flex: 1 },
  noContent: { flex: 1, alignItems: 'center' },
  noContentText: {
    fontSize: 22,
    lineHeight: 36,
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
  },
  noContentSubText: {
    fontSize: 16,
    color: cBlue,
    marginTop: 20,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  state: state,
  user: state.userReducer.user,
  ledger: state.unitReducer.ledger
})


export default connect(mapStateToProps)(UnitLedger)
