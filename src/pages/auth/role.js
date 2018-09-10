import React, {Component} from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import {Button} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import styles from './components/style';
import { sliderWidth, itemWidth } from './components/style_entry';

import { ENTRIES2 } from './components/entry';
import SliderEntry from './components/SliderEntry';
import { color } from '../../settings/appconfig';
import Hyperlink from 'react-native-hyperlink';


const SLIDER_1_FIRST_ITEM = 0;


export default class RoleView extends Component {

    constructor(props){
        super(props);
        this.state = {
            slider1ActiveSlide:0
        }
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

    render(){
        return(
            <SafeAreaView style={styles.safeArea}>
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
                            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                            />
                    </View>
                    <View style = {styles.containerBottom}>
                        <Button
                            buttonStyle = {{
                                backgroundColor:color.dark_primary,
                                borderRadius:5,
                                marginBottom:20
                            }}
                            title = "GET STARTED"
                        />
                        <Hyperlink 
                            // onPress = {() => {
                            //     this.termBtnHandle(true);
                            // }}
                            linkStyle={ {flex:7, color: '#627AF7', fontSize: 15 } }
                            linkText={ url => url === 'https://github.com/obipawan/hyperlink' ? 'login' : url }>
                            <Text style={ { fontSize: 15 } }>
                                Want to https://github.com/obipawan/hyperlink with another account.
                            </Text>
                        </Hyperlink>
                    </View>
                </View>
            </SafeAreaView>
        )
    }



}