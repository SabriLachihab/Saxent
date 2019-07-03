import React, { Component } from 'react'
import {View,Text,ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/HomePageStyle'
import {Button} from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{flex:1}}>
                <Text style={{marginTop:125,textAlign:'center',color:'black',fontSize:40,fontFamily:'vincHand'}}>WELCOME TO SAXENT</Text>
                <Button 
                    style={{marginTop: 100}}
                    icon={{name:'gamepad',type: 'font-awesome'}}
                    title="JOUER"
                    color="black"
                    borderRadius={8}
                    onPress={() => {
                        Actions.GridFlagComponent({initL:true})
                    }}
                    buttonStyle={{
                        backgroundColor: "#e0e0e0",
                      }}
                />
                <Button 
                    style={{marginTop: 50}}
                    icon={{name:'star',type: 'font-awesome',color:"yellow"}}
                    title="SCORES"
                    color="black"
                    borderRadius={8}
                    onPress={() => {
                        Actions.LeaderboardComponent({})
                    }}
                    buttonStyle={{
                        backgroundColor: "#e0e0e0",
                      }}
                    />
                     <Button 
                    style={{marginTop: 50}}
                    icon={{name:'comments',type: 'font-awesome'}}
                    title="Conversation"
                    color="black"
                    borderRadius={8}
                    onPress={() => {
                        Actions.ConversationLanguage({initL:true})
                    }}
                    buttonStyle={{
                        backgroundColor: "#e0e0e0",
                      }}
                />
                </View>
                <Text style={{textAlign:'center',fontFamily:'OpenSans-Regular',color:'black',fontSize:16,marginBottom:30}}>SABRI LACHIHAB DVIC - V 1.0</Text>
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


export default connect(mapStateToProps,mapDispatchToProps)(Home);

