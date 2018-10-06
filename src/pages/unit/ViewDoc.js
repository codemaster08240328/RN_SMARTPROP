import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import { Text, View, StyleSheet } from 'react-native'
import PDFView from 'react-native-view-pdf';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

class ViewDoc extends Component {

  // constructor(props) {
  //   super(props)
  
  //   this.state = {
       
  //   }
  // }
  
  componentDidMount() {
    console.log(this.props.doc)
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
    this.renderStarted = (new Date()).getTime();

    return (
      <View style={styles.container}>
      {this.props.doc&&
        <PdfContent
          resource={this.props.doc[0].BinaryData}
          resourceType="base64"
          onLoad={this.handleLoad}
          onError={this.handleError}
        />
      }
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
  doc: state.unitReducer.doc
})

export default connect(mapStateToProps)(ViewDoc)
