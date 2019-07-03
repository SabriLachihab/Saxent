import React, { Component } from 'react'
import {View,Text,TextInput,TouchableOpacity,ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/HomePageStyle'
import VoiceService from '../Services/VoiceRecognition'
import Icon from 'react-native-vector-icons/FontAwesome'
import VoiceOutput from '../Services/VoiceOutputService'
import Voice from 'react-native-voice'
import CircleStyles from './Styles/CircleViewStyle'
import {Actions as NavigationActions } from 'react-native-router-flux'
import RatingHeartComponent from './RatingHeartComponent'
import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'

class LearnComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            recognized: '',
            started: '',
            results: '',
            translated_text: '',
            languageVoice: '',
            stars:5,
            swip:false,
            stop:false,
            alert:false,
            activated:false
        }
        Voice.onSpeechStart = this.onSpeechStart.bind(this)
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
        Voice.onSpeechResults = this.onSpeechResults.bind(this) 
        this.navigation = this.navigation.bind(this)
    }

    onSpeechStart(e) {
        this.setState({
          started: '√',
        });
      }

    
    onSpeechResults(e) {
        if(!this.state.stop) {
            this.setState({
                results: e.value[0],
            },() => {
                if(e.value == this.state.translated_text){
                    if(this.state.swip == false) {
                        this.setState({swip: true},() => {
                            VoiceService.stopRecogntion()
                            this.navigation()
                        })
                    }
                }
                else {
                    const removeAccent = VoiceService.removeAccents(e.value[0])
                    if(removeAccent == this.state.translated_text){
                        this.setState({swip: true},() => {
                            VoiceService.stopRecogntion()
                            this.navigation()
                        })
                    }
                }
            });
        }
    }

    navigation() {
        NavigationActions.ResultsComponent({
            translated_text: this.state.translated_text,
            stars: this.state.stars,
            languageVoice: this.state.languageVoices
        })
    }
    
    onSpeechRecognized(e) {
        this.setState({
          recognized: '√',
        });
    }

    componentDidMount(){
        console.log(this.props.languageVoice)
        this.setState({
            translated_text: this.props.translated_text,
            languageVoice: this.props.languageVoice
        })
    }

    rating() {
        const ratingObj = {
            ratings: this.state.stars
        }

        return (
            <View style={{marginTop:20}}>
            <RatingHeartComponent ratingObj={ratingObj} />
            </View>
        )
    }

    showAlert() {
        this.setState({alert: !this.state.alert})
    }
    
    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
              <View style={{flex:1,marginTop:50}}>
                {this.rating()}
                <Text style={{marginTop:10,marginLeft:15,fontSize:16,fontFamily:'OpenSans-Regular',color:'black'}}>Texte à prononcer</Text>
                <View style={CircleStyles.squareLearn}>
                <TextInput
                    style={{marginTop:20, marginLeft:15,color:"black",fontFamily:'OpenSans-Regular',fontSize:15}}
                    value={this.state.translated_text}
                />
                </View>
                <View style={{marginTop: 20,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                <TouchableOpacity 
                    style={this.state.activated ? CircleStyles.CircleShapeViewActivated : CircleStyles.CircleShapeView}
                    onPress={() => {
                        VoiceService.stopRecogntion()
                        if(this.state.activated)
                        {
                            this.setState({stop:false,activated:false})
                        }
                        else {
                        this.setState({stop:false,activated:true})
                        VoiceService._startRecognition(this.state.languageVoice)
                        }
                    }}>
                    <Icon name='microphone' size={32}  color="white" style={{justifyContent:'center',alignItems:'center'}}/>
                    <Text style={{textAlign:'center',color:"white",fontSize:15,fontFamily:'OpenSans-Regular'}}>Parler</Text>
                </TouchableOpacity>  
                <TouchableOpacity 
                    style={CircleStyles.CircleShapeView}
                    onPress={() => {
                        VoiceService.stopRecogntion()
                        this.setState({activated:false})
                        VoiceOutput.voiceOutput(this.state.translated_text,this.state.languageVoice)
                    }}>
                    <Icon name='play-circle' size={32}  color="white" style={{justifyContent:'center',alignItems:'center'}}/>
                    <Text style={{textAlign:'center',color:"white",fontSize:15,fontFamily:'OpenSans-Regular'}}>Ecoute</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={CircleStyles.CircleShapeView}
                    onPress={() => {
                        VoiceService.stopRecogntion()
                        this.setState({results:'',stop:true,activated:false})
                        this.setState({stars: (this.state.stars)-1},() => {
                        if(this.state.stars == 0) {
                            this.showAlert()
                            }
                        })}
                    }>
                    <Icon name='eraser' size={32}  color="white" style={{justifyContent:'center',alignItems:'center'}}/>
                    <Text style={{textAlign:'center',color:"white",fontSize:15,fontFamily:'OpenSans-Regular'}}>Effacer</Text>
                </TouchableOpacity>
                </View> 
                <Text style={{marginTop:30, marginLeft:15,fontSize:16,fontFamily:'OpenSans-Regular',color:'black'}}>Resultat de la reconnaissance vocale</Text>
                <View style={CircleStyles.squareLearn}>
                <TextInput
                    style={{marginTop:20, marginLeft:15,color:"black",fontFamily:'OpenSans-Regular',fontSize:15}}
                    value={this.state.results}
                />
                </View>
              </View>
              <SCLAlert
          theme="danger"
          show={this.state.alert}
          title="Perdu"
          subtitle="Vous avez plus de vies"
          textStyle={{fontFamily:'OpenSans-Regular'}}
          onRequestClose={() => this.showAlert()}
        >
          <SCLAlertButton theme="info" textStyle={{fontFamily:'OpenSans-Regular'}} onPress={() => {this.setState({stars:5},()=> {this.showAlert()})}}>Recommencer</SCLAlertButton>
          <SCLAlertButton theme="default" textStyle={{fontFamily:'OpenSans-Regular'}} onPress={() => {
              this.showAlert()
              this.navigation()
            }}>Ok</SCLAlertButton>
        </SCLAlert>
            </View>
                    )
    }
}

const mapDispatchToProps = dispatch => ({

  })
  
function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(LearnComponent);