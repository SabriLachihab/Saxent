import React, { Component } from 'react'
import {View,Text,TextInput,ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/HomePageStyle'
import {Button,Rating} from 'react-native-elements'
import Flag from 'react-native-flags'
import Modal from "react-native-modal";
import {Actions as NavigationActions} from 'react-native-router-flux'
import StarRating from 'react-native-star-rating'
import { addNewPlayer } from '../Actions/ScoresActions'
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'


class ResultsComponent extends React.Component {
  
  constructor() {
      super()
      this.state = {
        coefTL:1,
        coefSL:1,
        stars:5,
        translated_text:'',
        score:0,
        backgroundColor:'#DC143C',
        flagSL: '',
        flagTL: '',
        nameUser:'',
        isModalVisible:false,
        alert:false
      }
  }

  componentDidMount() {
    const { coefSL , coefTL, flagSL, flagTL } = this.props.translate
    const { stars, translated_text } = this.props
    this.setState({
      coefTL, coefSL, stars, translated_text, flagSL , flagTL
    },() => {
      this.setState({score:Math.trunc(coefTL * coefSL  * translated_text.split(" ").length * stars)})
      if(stars>0) {
        this.setState({backgroundColor: '#7FFF00'})
      }
    })
  }

  resultDisplay() {
    return (
      this.state.stars > 0 ?
        <Text style={{textAlign:"center",color:"FFD300",fontSize:50,marginTop:20,fontFamily:'vincHand'}}>YOU WIN</Text> :
        <Text style={{textAlign:"center",color:"red",fontSize:50,marginTop:20,fontFamily:'vincHand'}}>YOU LOSE</Text> 
    )
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })

  showAlert() {
    this.setState({alert: !this.state.alert})
  }

  onStarRatingPress(value) {
        this._toggleModal()
        const infoplayer = {
          noteApp:value,
          flagSL:this.state.flagSL,
          flagTL:this.state.flagTL,
          coefSL:this.props.translate.coefSL,
          coefTL:this.props.translate.coefTL,
          tl:this.props.translate.tl,
          sl:this.props.translate.sl,
          score:this.state.score,
          original_text: this.props.translate.original_text,
          translated_text: this.state.translated_text,
          nameUser: this.state.nameUser,
          heart:this.props.stars
        }
        this.props.addNewPlayer(infoplayer)
        NavigationActions.home()
  }

  render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{flex:1,marginTop:50}}>
                  {this.resultDisplay()}
                  <Text style={{textAlign:"center",color:"black",fontSize:40,marginTop:15}}>{this.state.score} PTS</Text>
                  <View style={{flexDirection:'row',display:'flex',justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <Flag
                      code={this.state.flagSL}
                      size={48}/>
                    <Text style={{color:'black',fontSize:20}}>          ->          </Text>
                    <Flag
                      code={this.state.flagTL}
                      size={48}/>
                  </View>
                  <Text style={{textAlign:"center",color:"black",marginTop:20,fontSize:18,fontFamily:'OpenSans-Regular'}}>{this.props.translate.original_text}</Text>
                  <Text style={{textAlign:"center",color:"black",marginTop:5,fontSize:20,fontSize:20}}>↓</Text>
                  <Text style={{textAlign:"center",color:"black",marginTop:5,fontSize:18,fontFamily:'OpenSans-Regular'}}>{this.state.translated_text}</Text>
                  <TextInput
                      style={{height: 60, borderColor:'#F5F5F5',backgroundColor:'#F5F5F5', borderWidth: 5,marginLeft:20,marginRight:20,marginTop:20,color:'black'}}
                      onChangeText={(nameUser) => this.setState({nameUser})}
                      value={this.state.nameUser}
                      placeholder={'enter your name'}
                      placeholderTextColor={"black"}
                  />
                </View>
                <Modal isVisible={this.state.isModalVisible}>
                  <View style={{ justifyContent:'flex-start',alignItems:'center',alignSelf:'center',width:300,height:200}}>
                  <ImageBackground
                  source={require('../Images/vote.jpg')} 
                  style={{width: '100%', height: '100%',opacity:0.95}}
                  >
                    <Text style={{textAlign:'center'}}>Votez l'application</Text>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      fullStarColor={'yellow'}
                      style={{marginTop:10}}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                  </ImageBackground>
                  </View>
                </Modal>
                <Button
                    style={{marginBottom:10,justifyContent:'center',alignContent:'center'}}
                    icon={{name:'play',type: 'font-awesome', color:"red"}}
                    title="Next"
                    color="black"
                    borderRadius={8}
                    buttonStyle={{
                        backgroundColor: "#e0e0e0",
                    }}
                    
                    onPress={() => {
                      if(this.state.nameUser != ''){
                        this._toggleModal()
                      }
                      else {
                        this.showAlert()
                      }
                    }}
                />
                            <SCLAlert
          theme="danger"
          show={this.state.alert}
          title="Nom Imcomplet"
          subtitle="Vous avez pas saisit votre nom"
          textStyle={{fontFamily:'OpenSans-Regular'}}
          onRequestClose={() => this.showAlert()}
        >
          <SCLAlertButton theme="default" textStyle={{fontFamily:'OpenSans-Regular'}} onPress={() => {
              this.showAlert()
            }}>Ok</SCLAlertButton>
        </SCLAlert>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addNewPlayer: (infoplayer) => dispatch(addNewPlayer(infoplayer))
  })
  
function mapStateToProps(state) {
    return {
      translate: state.googleTrad
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ResultsComponent);