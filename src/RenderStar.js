import React from 'react'
import Animated, { Easing } from "react-native-reanimated";
import {Dimensions,View,Image} from 'react-native'
const { width, height } = Dimensions.get("window");
import styles from './css'
const { and,greaterThan,lessThan,not,block,debug,Clock,clockRunning,startClock,stopClock,cond, eq, add, set, Value, event, interpolate, Extrapolate, timing } = Animated;

function runTimingStar(stop:any,duration : number ,clock: Animated.Clock, value: number, dest: number) {

    //const heightS = new Value(height)
    //console.log(temp["_value"])
    const state = {
      finished: new Value(0),
      position: new Value(0),
      // amount of time running in duration
      time: new Value(0),
      // frame time for 'timing' function
      frameTime: new Value(0),
    };
  
    const config = {
      duration: duration,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.linear),
    };
    //debug('a',state.position)
    return block([
    
      cond(
          eq(stop,1),
          [
            set(state.finished,1),
            set(state.position,-50)
          ],
          cond(
            clockRunning(clock),
            [
              // if the clock is already running we update the toValue, in case a new dest has been passed in
              //set(config.toValue, dest),
              cond(
                greaterThan(state.position,height),
                //set(state.finished, 0),
                [
                  set(state.finished, 0),
                  set(state.time, 0),
                  set(state.position, value),
                  set(state.frameTime, 0),
                ]
              )
              //debug('to Value', state.position),
              //debug('time: ', state.time),
              //debug('frame time: ', state.frameTime),
            ],
            [
              // if the clock isn't running we reset all the animation params and start the clock
              set(state.finished, 0),
              set(state.time, 0),
              set(state.position, value),
              set(state.frameTime, 0),
              set(config.toValue, dest),
              startClock(clock),
            ],
          ),
          

      ),
      
      // we run the step here that is going to update position
      timing(clock, state, config),
      //set(state.finished, 0),
      // if the animation is over we stop the clock
      cond(state.finished,  stopClock(clock)),
      // we made the block return the updated position
      state.position,
    ]);
  }
  
  
  const RenderStar = (stop:any,duration:number) => {
  
    let clock = [new Clock(),new Clock(),new Clock(),new Clock(),new Clock(),new Clock(),new Clock(),new Clock(),new Clock(),new Clock(),new Clock()];
    //for(let i = 0; i < 5 ; i++) clock.push();
    let firstPos = [{'x' : 10 , 'y' : -500},{'x' : 40 , 'y' : -450},{'x' : 70 , 'y' : -400},{'x' : 330 , 'y' : -350},{'x' : 150 , 'y' : -330},
    {'x' : 260 , 'y' : -280},{'x' : 240 , 'y' : -250},{'x' : 200 , 'y' : -350},{'x' : 180 , 'y' : -300},{'x' : 130 , 'y' : -220},{'x' : 360 , 'y' : -475}];
    
    //let clock2 = new Clock();
    //let transY = runTiming(duration,clock[0],firstPos[0].y,height+50)
    let transY = [];
    for(let i = 0 ; i < 11 ; i ++) transY.push(runTimingStar(stop,duration,clock[i],firstPos[i].y,height+505+firstPos[i].y))
    //let transX = runTiming(10000,clock2,x,-width/3)
    return (
      <View style={{flexDirection:'row',position:'absolute'}}>
       
        <Animated.View style={{ position:'absolute', opacity:0.5, transform: [{ translateX: firstPos[3].x, translateY: transY[3] }] }} >
          <Image style={styles.star0 }  source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: firstPos[4].x, translateY: transY[4] }] }} >
          <Image style={styles.star1 }  source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{ position:'absolute', transform: [{ translateX: firstPos[0].x, translateY: transY[0] }] }} >
          <Image style={styles.star1 }  source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{ position:'absolute',opacity:0.5, transform: [{ translateX: firstPos[1].x, translateY: transY[1] }] }} >
          <Image style={styles.star0 }  source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{  position:'absolute',transform: [{ translateX: firstPos[2].x, translateY: transY[2] }] }} >
          <Image style={styles.star1 } source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{ position:'absolute', opacity:0.5,transform: [{ translateX: firstPos[5].x, translateY: transY[5] }] }} >
          <Image style={styles.star0 }  source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{  position:'absolute',opacity:0.5,transform: [{ translateX: firstPos[6].x, translateY: transY[6] }] }} >
          <Image style={styles.star0 }  source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{  position:'absolute',transform: [{ translateX: firstPos[7].x, translateY: transY[7] }] }} >
          <Image  style={styles.star1 } source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{ position:'absolute',opacity:0.5, transform: [{ translateX: firstPos[8].x, translateY: transY[8] }] }} >
          <Image style={styles.star0 }  source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{  position:'absolute',transform: [{ translateX: firstPos[9].x, translateY: transY[9] }] }} >
          <Image style={styles.star1 } source={require('../assets/star0.png')} />
        </Animated.View>
        <Animated.View style={{  position:'absolute',transform: [{ translateX: firstPos[10].x, translateY: transY[10] }] }} >
          <Image  style={styles.star1 } source={require('../assets/star0.png')} />
        </Animated.View>
       
      </View>
    );
  }

export default RenderStar;