import React, { Component } from 'react'
import {View,Text,TextInput,TouchableOpacity,ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/HomePageStyle'
import VoiceService from '../Services/VoiceRecognition'
import Icon from 'react-native-vector-icons/FontAwesome'
import VoiceOutput from '../Services/VoiceOutputService'
import Voice from 'react-native-voice'
import CircleStyles from './Styles/CircleViewStyle'
import Flag from 'react-native-flags'
import {Button} from 'react-native-elements'
import { fetchTranslate } from '../Actions/TranslateActions'

class ConversationComponent extends React.Component {
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
            activated:false,
            outputVoice:'',
            intputVoice:'',
            sl:'',
            tl:''
        }
        Voice.onSpeechStart = this.onSpeechStart.bind(this)
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
        Voice.onSpeechResults = this.onSpeechResults.bind(this) 
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
            })
        }
    }

    onSpeechRecognized(e) {
        this.setState({
          recognized: '√',
        });
    }

    componentDidMount(){
        this.setState({
            intputVoice: this.props.conversation.flagSL,
            outputVoice: this.props.conversation.flagTL,
            sl: this.props.conversation.sl,
            tl: this.props.conversation.tl
        })
    }

    componentWillReceiveProps(nextprops){
        this.setState({
            translated_text:nextprops.conversation.translated_text
        })
    }

    
    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
              <View style={{flex:1,marginTop:50}}>
              <View style={Styles.flagMenuConversation}>
              <Text style={{fontSize:16,fontFamily:'OpenSans-Regular',color:'black'}}>Vous</Text>
                    <Flag
                        code={this.state.intputVoice}
                        size={32}/>
                    <TouchableOpacity 
                    onPress={() => {
                        VoiceService.stopRecogntion()
                        if(this.state.activated)
                        {
                            this.setState({stop:false,activated:false})
                        }
                        else {
                        this.setState({stop:false,activated:true})
                        const languageVoice = this.state.sl + "-" + this.state.flagSL
                        VoiceService._startRecognition(languageVoice)
                        }
                    }}>
                    <Icon name='microphone' size={32}  color={this.state.activated ? "green" : "red"} style={{justifyContent:'center',alignItems:'center'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => {
                            VoiceService.stopRecogntion()
                            this.setState({results:'',stop:true,activated:false})
                        }
                    }>
                    <Icon name='eraser' size={32}  color="red" style={{justifyContent:'center',alignItems:'center'}}/>
                    </TouchableOpacity>
                </View>
                <View style={CircleStyles.squareLearn}>
                <TextInput
                    style={{marginTop:20, marginLeft:15,color:"black",fontFamily:'OpenSans-Regular',fontSize:15}}
                    value={this.state.results}
                />
                </View>
                <Button 
                    style={{marginTop: 20}}
                    icon={{name:'language',type: 'font-awesome',color:"black"}}
                    title="Traduire"
                    color="black"
                    borderRadius={8}
                    onPress={() => {
                        VoiceService.stopRecogntion()
                        this.setState({activated:false},() => {
                            this.props.translateAPI(this.state.results,this.state.sl,this.state.tl)
                        })
                        
                    }}
                    buttonStyle={{
                        backgroundColor: "#e0e0e0",
                      }}
                    />
                     <Button 
                    style={{marginTop: 20}}
                    icon={{name:'arrows-v',type: 'font-awesome',color:'black'}}
                    title="Inverser"
                    color="black"
                    borderRadius={8}
                    onPress={() => {
                        VoiceService.stopRecogntion()
                        this.setState({activated:false})
                        if(this.state.sl == this.props.conversation.sl){
                            this.setState({
                                sl: this.props.conversation.tl,
                                tl: this.props.conversation.sl,
                                intputVoice: this.props.conversation.flagTL,
                                outputVoice: this.props.conversation.flagSL,
                                results:'',
                                translated_text:''
                            })
                        }
                        else {
                            this.setState({
                                sl: this.props.conversation.sl,
                                tl: this.props.conversation.tl,
                                intputVoice: this.props.conversation.flagSL,
                                outputVoice: this.props.conversation.flagTL,
                                results:'',
                                translated_text:''
                            })
                        }
                    }}
                    buttonStyle={{
                        backgroundColor: "#e0e0e0",
                      }}
                />
                <View style={{marginTop:20}}></View>
                <View style={Styles.flagMenuConversation}>
                <Text style={{fontSize:16,fontFamily:'OpenSans-Regular',color:'black'}}>Le destinataire</Text>

                    <Flag
                        code={this.state.outputVoice}
                        size={32}/>
                    <TouchableOpacity 
                    onPress={() => {
                        VoiceService.stopRecogntion()
                        this.setState({activated:false})
                        const speakVoice = this.state.tl + "-" + this.state.flagTL
                        VoiceOutput.voiceOutput(this.state.translated_text,speakVoice)
                        }
                    }>
                    <Icon name='play-circle' size={32}  color="red" style={{justifyContent:'center',alignItems:'center'}}/>
                </TouchableOpacity>
                </View>
                <View style={CircleStyles.squareLearn}>
                <TextInput
                    style={{marginTop:20, marginLeft:15,color:"black",fontFamily:'OpenSans-Regular',fontSize:15}}
                    value={this.state.translated_text}
                />
                </View>
              </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    translateAPI: (text,init,final) => {dispatch(fetchTranslate(text,init,final))}
  })
  
function mapStateToProps(state) {
    return {
        conversation: state.conversation
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ConversationComponent);