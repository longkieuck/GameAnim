import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Dimensions, Button, Text } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import styles from './src/css'
import Score from './src/Score'
import RenderStar from './src/RenderStar'
import RenderUFO from './src/RenderUFO'
const { width, height } = Dimensions.get("window");

const { and, greaterThan, lessThan, not, block, debug, Clock, clockRunning, startClock, stopClock, cond, eq, add, set, Value, event, interpolate, Extrapolate, timing } = Animated;


export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { dur: 5000, level: 1};
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
  addX = add(this.offsetX, this.dragX);
  stopApp = new Value(0)
  
  transX = cond(
    eq(this.gestureState, State.ACTIVE),
    this.addX,
    
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
        dur: this.state.dur / 2,
        level: this.state.level + 1
      })
      
    }, 10000)
  }
  
  render() {
    return (

      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={styles.container}>

          {
            RenderUFO(this.stop,this.stopApp, this.state.dur, this.transX, height - 150)
          }

          {
            RenderStar(this.stop,this.state.dur)
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
              <Image style={styles.rocket} source={require('./assets/rocket.png')} />
            </Animated.View>
          </PanGestureHandler>
        </View>
        <Text style={styles.level}>LEVEL: {this.state.level}</Text>
        <Score stop={this.stop} />
      </View>

    );
  }
}


