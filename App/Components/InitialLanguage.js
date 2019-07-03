import React, { Component } from 'react'
import {View,Text,TextInput,TouchableOpacity,ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/HomePageStyle'
import CircleStyles from './Styles/CircleViewStyle'
import { Button } from 'react-native-elements'
import LangageVoice from '../Constant/Language'
import Flag from 'react-native-flags'
import VoiceService from '../Services/VoiceRecognition'
import Voice from 'react-native-voice'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome'
import { originalText } from '../Actions/TranslateActions'
import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'

class InitialLanguage extends React.Component {
    constructor() {
        super()
        this.state = {
            recognized: '',
            started: '',
            results: '',
            langage: LangageVoice,
            initialLangage: 'Français ( France )',
            languageVoice: 'fr-FR',
            stop:false,
            alert:false,
            activated:false
        }
        Voice.onSpeechStart = this.onSpeechStart.bind(this)
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
        Voice.onSpeechResults = this.onSpeechResults.bind(this) 
    }

    componentDidMount() {
        this.setState({
            initialLangage: this.props.initialLangage,
            languageVoice: this.props.languageVoice,
        })
    }

    onSpeechStart(e) {
        this.setState({
          started: '√',
        });
    }

    onSpeechRecognized(e) {
        this.setState({
          recognized: '√',
        });
    }

    onSpeechResults(e) {
        if(!this.state.stop) {
            this.setState({
            results: e.value[0],
            });
        }
    }

    showAlert() {
        this.setState({alert: !this.state.alert})
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{flex:1,marginTop:50}}>
                    <View style={Styles.flagMenu}>
                        <Flag
                            code={this.state.languageVoice.split("-")[1]}
                            size={32}/>
                        <Text style={Styles.textFlag}>{this.state.initialLangage}</Text>
                    </View>
                    <View style={{display:'flex', flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                        <TouchableOpacity 
                            style={this.state.activated ? CircleStyles.CircleShapeViewActivated : CircleStyles.CircleShapeView}
                            onPress={() => {
                                VoiceService.stopRecogntion()
                                if(this.state.activated){
                                    this.setState({stop:false,learn: false,activated:false})
                                }
                                else{
                                    this.setState({stop:false,learn: false,activated:true})
                                    VoiceService._startRecognition(this.state.languageVoice)
                                }
                            }}>
                            <Icon name="microphone" size={32} color="white" style={{justifyContent:'space-between',alignItems:'center'}}/>
                            <Text style={{textAlign:'center',color:"white",fontSize:18,fontFamily:'OpenSans-Regular'}}>Parler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={CircleStyles.CircleShapeView}
                            onPress={() => {
                                VoiceService.stopRecogntion()
                                this.setState({stop:true,results: '',activated:false})
                            }}>
                            <Icon name="eraser" size={32} color="white" style={{justifyContent:'center',alignItems:'center'}}/>
                            <Text style={{textAlign:'center',color:"white",fontSize:18,fontFamily:'OpenSans-Regular'}}>Effacer</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{marginTop:30,marginLeft:20,fontSize:16,fontFamily:'OpenSans-Regular',color:'white'}}>Résultat de la reconnaissance vocale</Text>
                    <View style={CircleStyles.square}>
                    <TextInput
                        style={{marginTop:15,marginLeft:15,alignItems:'flex-start',justifyContent:'flex-start',alignSelf:'flex-start',fontSize:15,color:'black',fontFamily:'OpenSans-Regular'}}
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
                        VoiceService.stopRecogntion()
                        if(this.state.results != '') {
                            this.props.originalText(this.state.results)
                            Actions.GridFlagComponent()
                        }
                        else {
                            this.showAlert()
                        }
                    }}
                />
                            <SCLAlert
          theme="warning"
          show={this.state.alert}
          textStyle={{fontFamily:'OpenSans-Regular'}}
          title="Attention"
          subtitle="Le champ de texte de la reconnaissance vocale est vide"
          onRequestClose={() => this.showAlert()}
        >
          <SCLAlertButton textStyle={{fontFamily:'OpenSans-Regular'}} theme="default" onPress={() => {this.showAlert()}}>OK</SCLAlertButton>
        </SCLAlert>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    originalText: (text) => dispatch(originalText(text))
  })
  
function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(InitialLanguage);