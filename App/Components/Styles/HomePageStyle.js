import {StyleSheet} from 'react-native'

 export default StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    defaultPage: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    textInput: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        height: 200,
        textAlign:'justify',
        textAlignVertical:'auto',
        overflow:'hidden',
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:15,
        color:'black',
        fontSize:18,
        fontFamily:'OpenSans-Regular'
    },
    textFlag:{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:15,
        color:'black',
        fontSize:18,
        fontFamily:'OpenSans-Regular'
    },
    icon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight:15
    },
    flagMenu: {
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flagMenuConversation:{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    }
});