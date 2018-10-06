// import React, { Component } from 'react'
// import { Text, View, StyleSheet } from 'react-native'
// import PDFView from 'react-native-view-pdf';



// class PDFCustomView extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//        resource:'',
//        resourceType: ''
//     }
//     this.renderStarted = 0;
//   }

//   componentDidMount() {
//     console.log('asdfasdfasd',this.props.content)
//     this.setState({
//       resource: this.props.content,
//       resourceType: this.props.type
//     })
//   }
  
//   handleLoad = () => {
//     Alert.alert(
//       'Document loaded',
//       `Time: ${((new Date()).getTime() - this.renderStarted)}`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'OK' },
//       ],
//     );
//   }

//   handleError = (error) => {
//     Alert.alert(
//       'Document loading failed',
//       error.message,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'OK' },
//       ],
//     );
//   }

//   render() {
    
//   }
// }
// const cWhite = '#f9f9f9';
// const cLightBlue = '#5bc0de';
// const cGreen = '#5cb85c';
// const cBlue = '#428bca';
// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 20,
//     flex: 1,
//     backgroundColor: cWhite,
//   },
//   tabs: { flexDirection: 'row' },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: cLightBlue,
//     borderColor: cBlue,
//     borderWidth: 2,
//   },
//   content: { flex: 1, backgroundColor: cGreen },
//   pdfView: { flex: 1 },
//   noContent: { flex: 1, alignItems: 'center' },
//   noContentText: {
//     fontSize: 22,
//     lineHeight: 36,
//     fontWeight: 'bold',
//     marginTop: 60,
//     textAlign: 'center',
//   },
//   noContentSubText: {
//     fontSize: 16,
//     color: cBlue,
//     marginTop: 20,
//     textAlign: 'center',
//   },
// });

// export default PDFCustomView