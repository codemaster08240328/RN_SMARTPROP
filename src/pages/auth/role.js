import React, {Component} from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import {Button} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import styles from './components/style';
import { sliderWidth, itemWidth } from './components/style_entry';
import {connect} from 'react-redux';

import { ENTRIES2 } from './components/entry';
import SliderEntry from './components/SliderEntry';
import { color } from '../../settings/appconfig';
import Hyperlink from 'react-native-hyperlink';
import Spinner from 'react-native-loading-spinner-overlay';
import actions from '../../redux/profile/action';


const SLIDER_1_FIRST_ITEM = 0;


class RoleView extends Component {

    constructor(props){
        super(props);
        this.state = {
            slider1ActiveSlide:0
        }
        this.itemChange = this.itemChange.bind(this);
        this.getStarted = this.getStarted.bind(this);
    }

    componentDidMount(){
        data = {
            EMail:this.props.auth.EMail
        }
        this.props.dispatch(actions.getUser(data))
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    itemChange(index){
        console.log(index);
        this.setState({ slider1ActiveSlide: index })
    }

    getStarted(){
        this.props.navigation.navigate("dashboard");
    }

    render(){
        return(
            <SafeAreaView style={styles.safeArea}>
                <Spinner visible={this.props.userReducer.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <View style = {styles.header}>
                    <Text style={{color:'white',fontSize:20}}>USER ROLE</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.exampleContainer}>
                        <Text style={styles.title}>WELCOME!</Text>
                        <Text style={styles.subtitle}>You are logging in now as: </Text>
                        <Carousel
                            ref={c => this._slider1Ref = c}
                            data={ENTRIES2}
                            renderItem={this._renderItemWithParallax}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            hasParallaxImages={true}
                            firstItem={SLIDER_1_FIRST_ITEM}
                            inactiveSlideScale={0.94}
                            inactiveSlideOpacity={0.7}
                            // inactiveSlideShift={20}
                            containerCustomStyle={styles.slider}
                            contentContainerCustomStyle={styles.sliderContentContainer}
                            loop={false}
                            loopClonesPerSide={2}
                            autoplay={false}
                            autoplayDelay={500}
                            autoplayInterval={3000}
                            onSnapToItem={(index) => this.itemChange(index) }
                            />
                    </View>
                    <View style = {styles.containerBottom}>
                        <Button
                            buttonStyle = {{
                                backgroundColor:color.dark_primary,
                                borderRadius:5,
                                marginBottom:20,
                                width: itemWidth - 20
                            }}
                            onPress = {this.getStarted}
                            title = "GET STARTED"
                        />
                        <Hyperlink 
                            // onPress = {() => {
                            //     this.termBtnHandle(true);
                            // }}
                            linkStyle={ {flex:7, color: '#627AF7', fontSize: 15 } }
                            linkText={ url => url === 'https://github.com/obipawan/hyperlink' ? 'login' : url }>
                            <Text style={ { fontSize: 15, color:color.font } }>
                                Want to https://github.com/obipawan/hyperlink with another account.
                            </Text>
                        </Hyperlink>
                    </View>
                </View>
            </SafeAreaView>
        )
    }



}

function mapStateToProps(state){
    return{
        auth:state.authReducer.auth,
        userReducer:state.userReducer
    }
}

export default connect(mapStateToProps)(RoleView)