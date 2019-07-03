import React, { Component } from 'react'
import {View,Text,Image,ImageBackground,Button} from 'react-native'
import { connect } from 'react-redux'
import LangageVoice from '../Constant/Language'
import Flag from 'react-native-flags'
import VoiceOutput from '../Services/VoiceOutputService'
import Modal from "react-native-modal";
import Leaderboard from 'react-native-leaderboard'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { playAgain } from '../Actions/ScoresActions'
import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'
import StarRating from 'react-native-star-rating'
import CircleStyles from './Styles/CircleViewStyle'


class LeaderboardComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            firstUserName: '',
            firstUserScore: 0,
            note:5,
            flagSL:'',
            flagTL:'',
            score:'',
            isModalVisible:false,
            opacity:0.95,
            original_text:'',
            translated_text:'',
            item:null,
            alert:false,
            tl:'',
            sl:''
        }
        this.getScores = this.getScores.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
    }



    componentDidMount() {
        const array = this.getScores(this.props.ranking)
        const firstUserScore = Math.max(...array)
        const index = array.indexOf(firstUserScore)
        console.log(this.props.ranking)
        if(index >= 0) {
            this.setState({firstUserName:(this.props.ranking[index].nameUser)})
            this.getNotes(this.props.ranking)
        }
        this.setState({firstUserScore})
    }

    getScores(data){
        return data.map(item => item.score)
    }

    getNotes(data) {
        const array = (data.filter(item => item.noteApp)).map(item => item.noteApp)
        const note = array.reduce(function (a, b) {
            return a + b;
          }) / array.length
        this.setState({note})
    }

    renderHeader() {
        if(this.props.ranking.length > 0) { 
            return (
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 15, marginTop: 20
                }}>
                    <Text style={{ color: 'black', fontSize: 22, flex: 1, textAlign: 'right', marginRight: 40, fontFamily:'OpenSans-Regular' }}>
                        {this.state.firstUserName}
                    </Text>
                    <Image style={{ flex: .66, height: 60, width: 60, borderRadius: 60 / 2 }}
                        source={{ uri: 'https://www.anglaisfacile.com/free/images/api/titre.gif' }} />
                    <Text style={{ color: 'black', fontSize: 25, flex: 1, marginLeft: 40,fontFamily:'OpenSans-Regular' }}>
                       {this.state.firstUserScore} pts
                    </Text>
                    </View> 
            )
         }
         else {
             return (
                <View><Text style={{color:'white',fontSize:18,textAlign:'center',marginTop:100,fontFamily:'OpenSans-Regular'}}>Aucun score a été enregistrer</Text></View>
             )
         }
    }

    onRowPress(item,index) {
        console.log(item)
        this.setState({
            flagSL:item.flagSL,
            flagTL:item.flagTL,
            nameUser:item.nameUser,
            score:item.score,
            original_text:item.original_text,
            translated_text:item.translated_text,
            item,
            alert:true,
            tl:item.tl,
            flagTL:item.flagTL,
            sl:item.sl
        })
    }

    displayLeaderBoard() {
        if(this.props.ranking.length > 0) {
            return (
                <Leaderboard 
                    data={this.props.ranking} 
                    sortBy='score' 
                    labelBy='nameUser'
                    onRowPress={(item,index) => this.onRowPress(item,index)}
                    containerStyle={{backgroundColor:'#F5F5F5'}}
                /> 
            )
        }
        else {
            return null
        }
    }

    play() {
        this.showAlert()
        this.props.playAgain(this.state.item)
        this.setState({isModalVisible:false}, () => {
            NavigationActions.LearnComponent({
                translated_text: this.state.translated_text,
                languageVoice: ((this.state.item.tl.concat("-")).concat(this.state.item.flagTL))
            })
        })
    }

    showAlert() {
        this.setState({alert: !this.state.alert})
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{ padding: 15, paddingTop: 70, alignItems: 'center' }}>
                <Text style={{ fontSize: 40, color: 'black',fontFamily:'vincHand' }}>Saxent Scores</Text>
                {this.renderHeader()}
              </View>
              {this.displayLeaderBoard()}
            <Modal isVisible={this.state.isModalVisible}>
                <View style={{ justifyContent:'flex-start',alignItems:'center',alignSelf:'center',height:200,backgroundColor:'white'}}>
                    <Text style={{textAlign:'center'}}>{this.state.nameUser} a marqué {this.state.score} points.</Text>
                    <View style={{flexDirection:'row',display:'flex',justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <Flag
                      code={this.state.flagSL}
                      size={24}/>
                    <Text style={{color:'black',fontSize:20}}>          ->          </Text>
                    <Flag
                      code={this.state.flagTL}
                      size={24}/>
                  </View>
                  <Text>{this.state.original_text} => {this.state.translated_text}</Text>
                  <Button style={{marginTop:10}}onPress={() => this.play()} title="PLAY"/>
                  <Button style={{marginTop:10}}onPress={() => this.setState({isModalVisible:false,opacity:0.95})} title="OK"/>
                  </View>
            </Modal>
            <SCLAlert
          theme="info"
          show={this.state.alert}
          title={this.state.sl +' => ' +this.state.tl}
          subtitle={this.state.translated_text}
          onRequestClose={() => this.showAlert()}
        >
          <SCLAlertButton theme="info" onPress={() => {this.play()}}>Jouer</SCLAlertButton>
          <SCLAlertButton theme="success" onPress={() => {
                VoiceOutput.voiceOutput(this.state.translated_text,((this.state.item.tl.concat("-")).concat(this.state.item.flagTL)))
            }}>Ecouter</SCLAlertButton>
          <SCLAlertButton theme="default" onPress={() => {
              this.showAlert()
            }}>Ok</SCLAlertButton>
        </SCLAlert>
            <Text style={{textAlign:'center',fontFamily:'OpenSans-Regular',color:'black',fontSize:16,marginBottom:5}}>Note général de l'application</Text>
            <View style={{justifyContent:'center',alignItems:'center',width:160,alignSelf:'center'}}>
            <StarRating
        disabled={true}
        maxStars={5}
        rating={this.state.note}
        fullStarColor={'yellow'}
      />
      </View>
      </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    playAgain: (infoplayer) => dispatch(playAgain(infoplayer))

  })
  
function mapStateToProps(state) {
    return {
        ranking:state.scores.ranking,
        translate:state.googleTrad
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(LeaderboardComponent);