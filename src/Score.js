import React from "react";
import styles from './css'
import RNRestart from 'react-native-restart'
import { Text, View, Button } from 'react-native'
import Animated, { Easing } from "react-native-reanimated";
const { and, greaterThan, call, lessThan, not, block, debug, Clock, clockRunning, startClock, stopClock, cond, eq, add, set, Value, event, interpolate, timing } = Animated;

function runTimingScore(stop: any, duration: number, clock: Animated.Clock) {

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
            eq(stop, 1),
            [
                set(state.finished, 1),
            ],
            cond(
                clockRunning(clock),
                [
                    // if the clock is already running we update the toValue, in case a new dest has been passed in
                    set(config.toValue, 500),//destinatiom = 500

                    //debug('to Value', state.position),
                    //debug('time: ', state.time),
                    //debug('frame time: ', state.frameTime),
                ],
                [
                    // if the clock isn't running we reset all the animation params and start the clock
                    set(state.finished, 0),
                    set(state.time, 0),
                    set(state.position, 0),
                    set(state.frameTime, 0),
                    set(config.toValue, 500),//destinatiom = 500
                    startClock(clock),
                ],
            ),


        ),

        // we run the step here that is going to update position
        timing(clock, state, config),
        //set(state.finished, 0),
        // if the animation is over we stop the clock
        cond(state.finished, stopClock(clock)),
        // we made the block return the updated position
        state.position,
    ]);
}

export default class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }
    }
    stopX = new Value(0)
    stopY = new Value(1)
    componentDidMount() {

        this.time = setInterval(() => {
            this.setState({
                score: this.state.score + 1
            })
        }, 100)

    }

    opacity = interpolate(this.props.stop, {
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    opacityGameOver = interpolate(this.props.stop, {
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    // componentDidUpdate() {

    //     //if(this.props.value === this.stopX.value) console.log('change')
    //     console.log('after : ' + this.stopX['_value'])
    // }
    // functionClearInterval(){
    //     clearInterval(this.time);
    // }

    render() {
        return (
            <>

                <Animated.View style={[styles.score, { opacity: this.opacity }]} >

                    <Text style={{ color: 'black', fontSize: 20 }}> SCORE{'\n'} {this.state.score} </Text>
                </Animated.View>
                <Animated.View style={[styles.gameOver, { opacity: this.opacityGameOver }]} >
                    <Text style={{ color: 'red', fontSize: 40 }}> GAME OVER! </Text>
                    <Text style={{ color: 'black', fontSize: 20 }}> SCORE{'\n'} {this.state.score} </Text>
                    <Button
                        title="Reload App"
                        color="#f194ff"
                        onPress={() =>  RNRestart.Restart()}
                    />
                </Animated.View>
            </>
        )
    }
}

// const Score = (stop) => {
//     let clock = new Clock();
//     let score = runTimingScore(stop,4000,clock)
//     console.log(score)
//     return (
//         <Animated.View style={styles.score} >

//             <Animated.Text style={{ color: 'black', fontSize: 20 }}> SCORE{'\n'} {String(score)} </Animated.Text>
//         </Animated.View>
//     )
// }
// export default Score;