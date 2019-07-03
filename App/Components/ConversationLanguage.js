import React, { Component } from 'react'
import {View,FlatList,Text,TouchableOpacity,ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/HomePageStyle'
import StylesGrid from './Styles/GridStyles'
import LangageVoice from '../Constant/Language'
import Flag from 'react-native-flags'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { changeSL, changeTL } from '../Actions/TranslateActions'

class ConversationLanguage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: 'Veuillez choisir votre langue',
            initL: false
        }
        this.renderItem = this.renderItem.bind(this)
        this.navigation = this.navigation.bind(this)
    }

    componentDidMount(){
        if(this.props.initL != undefined) {
            this.setState({text: 'Veuillez choisir votre langue'})
            this.setState({initL: true})
        }
        else {
            this.setState({text: 'Veuillez choisir la langue de votre destinataire'})
        }
    }

    navigation(item) {
        if(this.state.initL) {
            this.props.changeSL(item.key.split("-")[0],item.coef,item.key.split("-")[1])
            NavigationActions.ConversationLanguage()
        }
        else {
            this.props.changeTL(item.key.split("-")[0],item.coef,item.key.split("-")[1])
            NavigationActions.ConversationComponent({outputVoice: item.key,finalLangage: item.label})
        }
    }

    renderItem({ item, index }) {
        return (
            <View style={StylesGrid.grid}>
                <TouchableOpacity
                    onPress={() => {
                        this.navigation(item)
                    }}>
                <Flag
                code={item.key.split("-")[1]}
                size={32}
                style={Styles.text}
                />
                <Text style={{textAlign:'center',color:'black',fontFamily:'OpenSans-Regular',fontSize:18}}>{item.key.split("-")[1]}</Text>
            </TouchableOpacity>
        </View>
        )
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{flex:1,marginTop:50}}>
                    <Text style={{textAlign:'center',marginTop:20,color:'black',fontSize:20}}>{this.state.text}</Text>
                    <FlatList
                        style={{marginTop:20}}
                        contentContainerStyle={StylesGrid.list}
                        data={LangageVoice}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeTL: (tl,coef,flag) => {dispatch(changeTL(tl,coef,flag))},
    changeSL: (sl,coef,flag) => {dispatch(changeSL(sl,coef,flag))}
  })
  
function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ConversationLanguage);