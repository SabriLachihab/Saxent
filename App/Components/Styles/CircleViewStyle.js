import {StyleSheet,Dimensions} from 'react-native'

var {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    CircleShapeView: {
        width: 80,
        height: 80,
        borderRadius: 150/2,
        backgroundColor: 'red',
        display:'flex',
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:20
    },CircleShapeViewActivated: {
        width: 80,
        height: 80,
        borderRadius: 150/2,
        backgroundColor: 'green',
        display:'flex',
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:20
    },
    square:{
        marginTop:20,
        width:0.9*width,
        flex:1,
        alignSelf:'center',
        borderWidth:3,
        borderRadius:30,
        marginBottom:20,
        borderColor:'#F5F5F5',
        backgroundColor:'#F5F5F5'
    },
    squareScores:{
        marginTop:20,
        width:0.9*width,
        flex:1,
        alignSelf:'center',
        borderWidth:3,
        borderRadius:3,
        marginBottom:20,
        borderColor:'#F5F5F5',
        backgroundColor:'#F5F5F5'
    },
    squareLearn:{
        marginTop:20,
        width:0.9*width,
        borderColor:'#F5F5F5',
        backgroundColor:'#F5F5F5',
        height:120,
        alignSelf:'center',
        borderWidth:3,
        marginBottom:20
    }
});

export default styles