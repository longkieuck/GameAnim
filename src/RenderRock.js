import React from 'react'
import Animated, { Easing } from "react-native-reanimated";
import { Dimensions, View, Image } from 'react-native'
const { width, height } = Dimensions.get("window");
import styles from './css'
const { and, greaterThan, lessThan, not, block, Clock, clockRunning, startClock, stopClock, cond, set, Value, Extrapolate, timing } = Animated;



function runTimingRock(stop, duration, clock, value, dest, currX, stopX, stopY) {
 
  const state = {
    finished: new Value(0),
    position: new Value(0),
    // amount of time running in duration
    time: new Value(0),
    // frame time for 'timing' function
    frameTime: new Value(0),
  };

  const config = {// set props for rock
    duration: duration,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.linear),
  };

  return block([
    cond(
      and(not(stop), clockRunning(clock)),
      [

        cond(
          and(greaterThan(state.position, stopY), greaterThan(stopY + 80, state.position), lessThan(stopX, currX + 20), lessThan(currX - 40, stopX)),// x curr = 150
          //set(state.finished, 0),
          [
            set(stop,1),
            set(state.position,-100),
            set(state.finished,1)
          ],
          cond(
            greaterThan(state.position, height),
            //set(state.finished, 0),
            [
              set(state.finished, 0),
              set(state.time, 0),
              set(state.position, value),//value->random
              set(state.frameTime, 0),
            ]

          )
        ),

      ],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
}

const RenderRock = (stop, duration, stopX, stopY) => {

  let clock = [new Clock(), new Clock(), new Clock(), new Clock(), new Clock(), new Clock()];
  let currX = [0, width / 6, 2 * width / 6, 3 * width / 6, 4 * width / 6, 5 * width / 6]
  let transY = [runTimingRock(stop, duration, clock[0], -750, height + 50, currX[0], stopX, stopY), runTimingRock(stop, duration, clock[1], -600, height + 200, currX[1], stopX, stopY)
    , runTimingRock(stop, duration, clock[2], -450, height + 350, currX[2], stopX, stopY), runTimingRock(stop, duration, clock[3], -400, height + 400, currX[3], stopX, stopY)
    , runTimingRock(stop,duration, clock[4], -150, height + 650, currX[4], stopX, stopY), runTimingRock(stop, duration, clock[5], -300, height + 500, currX[5], stopX, stopY)]
  return (
    <>
      <Animated.View style={{ transform: [{ translateX: currX[0], translateY: transY[0] }] }} >
        <Image style={styles.ufo} source={require('../assets/rock.png')} />
      </Animated.View>

      < Animated.View style={{ transform: [{ translateX: currX[4], translateY: transY[4] }] }} >
        <Image style={styles.ufo} source={require('../assets/rock.png')} />
      </Animated.View>

      < Animated.View style={{ transform: [{ translateX: currX[2], translateY: transY[2] }] }} >
        <Image style={styles.ufo} source={require('../assets/rock.png')} />
      </Animated.View>

      < Animated.View style={{ transform: [{ translateX: currX[1], translateY: transY[1] }] }} >
        <Image style={styles.ufo} source={require('../assets/rock.png')} />
      </Animated.View>

      < Animated.View style={{ transform: [{ translateX: currX[3], translateY: transY[3] }] }} >
        <Image style={styles.ufo} source={require('../assets/rock.png')} />
      </Animated.View>

      < Animated.View style={{ transform: [{ translateX: currX[5], translateY: transY[5] }] }} >
        <Image style={styles.ufo} source={require('../assets/rock.png')} />
      </Animated.View>

      </>
      );
  }

export default RenderRock; 