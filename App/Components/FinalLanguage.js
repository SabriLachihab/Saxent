import React, { Component } from 'react'
import {View,Text,TextInput,TouchableOpacity,ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/HomePageStyle'
import CircleStyles from './Styles/CircleViewStyle'
import {Button} from 'react-native-elements'
import Flag from 'react-native-flags'
import VoiceOutput from '../Services/VoiceOutputService'
import { Actions as NavigationActions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome'
import { fetchTranslate } from '../Actions/TranslateActions'



class FinalLnguage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: '',
            finalLangage:'',
            outputVoice:''
        }
    }

    componentDidMount() {
        this.setState({
            finalLangage: this.props.finalLangage,
            outputVoice: this.props.outputVoice,
        })
        this.props.translateAPI(this.props.translate.original_text,this.props.translate.sl,this.props.translate.tl)
    }

    componentWillReceiveProps(nextprops){
        this.setState({results: nextprops.translate.translated_text},() => {
            VoiceOutput.voiceOutput(this.state.results,this.state.outputVoice)
        })
    }

    render() {
        return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{flex:1,marginTop:50}}>
                <View style={Styles.flagMenu}>
                    <Flag
                        code={this.state.outputVoice.split("-")[1]}
                        size={32}/>
                    <Text style={Styles.text}>{this.state.finalLangage}</Text>
                </View>
                <TouchableOpacity 
                    style={CircleStyles.CircleShapeView}
                    onPress={() => {
                        VoiceOutput.voiceOutput(this.state.results,this.state.outputVoice)
                    }}>
                    <Icon name='play-circle' size={32}  color="white" style={{justifyContent:'center',alignItems:'center'}}/>
                    <Text style={{textAlign:'center',color:"white",fontSize:18,fontFamily:'OpenSans-Regular'}}>Listen</Text>
                </TouchableOpacity>
                <Text style={{marginTop:15,marginLeft:15,fontSize:18,fontFamily:'OpenSans-Regular',color:'white'}}>results :</Text>
                <View style={CircleStyles.square}>
                <TextInput
                    style={{marginTop:15,marginLeft:15,color:'red',alignItems:'flex-start',justifyContent:'flex-start',alignSelf:'flex-start',fontSize:15,color:'black',fontFamily:'OpenSans-Regular'}}
                    multiline = {true}
                    value={this.state.results}
                />
                </View>
            </View>
            <Button
                style={{marginBottom:10,justifyContent:'center',alignContent:'center'}}
                icon={{name:'arrow-right',type: 'font-awesome', color:"red"}}
                title="Next"
                color="black"
                borderRadius={8}
                    buttonStyle={{
                        backgroundColor: "#e0e0e0",
                    }}
                onPress={() => {
                    NavigationActions.LearnComponent({
                        translated_text: this.state.results,
                        languageVoice: this.state.outputVoice
                    })
                }}/>
        </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    translateAPI: (text,init,final) => {dispatch(fetchTranslate(text,init,final))}
})
  
function mapStateToProps(state) {
    return {
        translate: state.googleTrad
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(FinalLnguage);