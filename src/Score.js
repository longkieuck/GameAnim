import React from "react";
import styles from './css'
import RNRestart from 'react-native-restart'
import { Text, View, Button } from 'react-native'
import Animated, { Easing } from "react-native-reanimated";
const { and, greaterThan, call, lessThan, not, block, debug, Clock, clockRunning, startClock, stopClock, cond, eq, add, set, Value, event, interpolate, timing } = Animated;

export default class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }
        //this.stopApp = cond(eq(this.props.stop,1),call([this.props.stop],this.onDrop))
    }

    componentDidMount() {

        this.time = setInterval(() => {
            this.setState({
                score: this.state.score + 1
            })
            console.log('running')
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

    
    onDrop=([x]) =>{
        clearInterval(this.time);
        console.log('stop = 1')
    }

    render() {
        return (
            <>
                <Animated.Code>
                    {
                        cond(eq(this.props.stop,1),call([this.props.stop],this.onDrop))
                    }
                </Animated.Code>
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