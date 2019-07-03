import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
    grid: {
        flex: 1,
        margin: 5,
        minWidth: 60,
        maxWidth: 223,
        height: 50,
        maxHeight:304,
        alignContent:'center',
        justifyContent:'center'
    },
    list: {
        justifyContent: 'center',
        alignContent:'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop:10
    }
})

export default Styles