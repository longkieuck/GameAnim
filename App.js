import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Dimensions, Button, Text, ImageBackground } from "react-native";
import Animated, { Easing, lessThan } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import styles from './src/css'
import Score from './src/Score'
import RenderStar from './src/RenderStar'
import RenderRock from './src/RenderRock'
const { width, height } = Dimensions.get("window");

const { block,cond, eq, add, set, Value, event,greaterThan} = Animated;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dur: 10000, level: 1, start: false };
  }
  //Control Rocket
  stop = new Value(0);

  dragX = new Value(0);
  offsetX = new Value(width / 2);
  gestureState = new Value(-1);
  onGestureEvent = event([
    {
      nativeEvent: {
        translationX: this.dragX,
        state: this.gestureState,
      },
    },
  ]);
  addX = cond(
    greaterThan(this.offsetX,width-50),
    set(this.offsetX,width-50),
    cond(
      lessThan(this.offsetX,-30),
      set(this.offsetX,-30),
      add(this.offsetX, this.dragX)
    )
    
  );

  // onDrop([x]) {
  //   console.log('stop')
  // }


  transX = cond(
    eq(this.gestureState, State.ACTIVE),
    [
      this.addX,
    ],

    block([
      set(this.offsetX, this.addX),
      set(this.dragX, 0),
      //set(this.stop,1),
      this.offsetX
    ])
  );

  componentDidMount() {
    //if(eq(this.stop,)) console.log('1')

    setInterval(() => {
      this.setState({
        dur: this.state.dur * 3 / 4,
        level: this.state.level + 1
      })

    }, 10000)
  }

  render() {
    return (

      <ImageBackground style={{flex:1,resizeMode:'contain'}} source={require('./assets/back.jpg')}>

     
        {!this.state.start && <View style={[styles.gameOver, { opacity: 1 }]} >
          <Text style={{ color: 'red', fontSize: 40 }}> Are You Ready! </Text>
          <Button
            title="START"
            color="#f194ff"
            onPress={() => this.setState({ start: true })}
          />
        </View>}

        {
          this.state.start &&
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={styles.container}>

              {
                RenderRock(this.stop, this.state.dur, this.transX, height - 150)
              }

              {
                RenderStar(this.stop, this.state.dur)
              }

            </View>
            <View>
              <PanGestureHandler
                maxPointers={1}
                onGestureEvent={this.onGestureEvent}
                onHandlerStateChange={this.onGestureEvent}
              >
                <Animated.View
                  style={[
                    {
                      transform: [
                        {
                          translateX: this.transX,
                        },
                        {
                          translateY: height - 100,
                        },
                      ],
                    },
                  ]}
                >
                  <Image style={styles.rocket} source={require('./assets/rocket-icon.png')} />
                </Animated.View>
              </PanGestureHandler>
            </View>
            <Text style={styles.level}>LEVEL: {this.state.level}</Text>
            <Score stop={this.stop} />
          </View>
        }
       </ImageBackground>
    );
  }
}


