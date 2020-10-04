import {StyleSheet,Dimensions} from 'react-native'
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor:'black',
      flexDirection: 'row',
      justifyContent:'space-between',
      position:'absolute'
      //alignItems:'space-between'
      
    },
    rocket:{
      
      height:80,
      width:80
    },
    star1:{
      height:25,
      width:25
    },
    star0:{
      
      height:20,
      width:20
    },
    ufo:{
      position:'absolute',
      height:50,
      width:50
    },
    score:{
      margin:30,
      alignItems:'center',
      justifyContent:'center', 
      position:'absolute',
      width:80,
      height:60,
      backgroundColor:'gray',
      borderRadius:10
    },
    gameOver:{
      margin:40,
      alignItems:'center',
      justifyContent:'center', 
      position:'absolute',
      width:width-80,
      height:200,
      backgroundColor:'gray',
      borderRadius:10
    },
    level:{
    position:'absolute',
    color:'red',
    marginLeft:25,
    fontSize:20 
    }
  });
  export default styles;