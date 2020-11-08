import React from "react";
import styles from './css'
import RNRestart from 'react-native-restart'
import { Text, View, Button } from 'react-native'
import Animated, { Easing } from "react-native-reanimated";
const { call, cond, eq, interpolate } = Animated;

export default class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            visible:false
        }
    }

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

    // opacityGameOver = interpolate(this.props.stop, {
    //     inputRange: [0, 1],
    //     outputRange: [0, 1],
    // });


    onDrop = ([x]) => {
        clearInterval(this.time);
        this.setState({
            visible:true
        })
    }

    render() {
        return (
            <>
                <Animated.Code>
                    {
                        cond(eq(this.props.stop, 1), call([this.props.stop], this.onDrop))
                    }
                </Animated.Code>
                <Animated.View style={[styles.score, { opacity: this.opacity }]} >

                    <Text style={{ color: 'black', fontSize: 20 }}> SCORE{'\n'} {this.state.score} </Text>
                </Animated.View>

                {
                        this.state.visible && 
                    <View style={[styles.gameOver, { opacity: 1 }]} >
                        <Text style={{ color: 'red', fontSize: 40 }}> GAME OVER! </Text>
                        <Text style={{ color: 'black', fontSize: 20 }}> SCORE{'\n'} {this.state.score} </Text>
                        <Button
                            title="Reload App"
                            color="#f194ff"
                            onPress={() => RNRestart.Restart()}
                        />
                    </View>
                }
            </>
        )
    }
}
