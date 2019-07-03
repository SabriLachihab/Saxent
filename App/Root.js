import React, {Component} from 'react';
import Home from './Components/Home'
import InitialLanguage from './Components/InitialLanguage'
import GridFlagComponent from './Components/GridFlagComponent'
import { Router, Scene } from 'react-native-router-flux'
import FinalLanguage from './Components/FinalLanguage'
import LeaderboardComponent from './Components/LeaderboardComponent'
import LearnComponent from './Components/LearnComponent'
import ResultsComponent from './Components/ResultsComponent'
import ConversationLanguage from './Components/ConversationLanguage'
import ConversationComponent from './Components/ConversationComponent'

const Routes = () => (
    <Router>
       <Scene key = "root">
          <Scene key = "home" component = {Home} initial = {true} hideNavBar={true} />
          <Scene key = "initailLanguage" component= {InitialLanguage} navTransparent={true}/>
          <Scene key = "GridFlagComponent" component={GridFlagComponent} navTransparent={true}/>
          <Scene key = "FinalLanguage" component={FinalLanguage} navTransparent={true}/>
          <Scene key = "LeaderboardComponent" component={LeaderboardComponent} navTransparent={true}/>
          <Scene key = "LearnComponent" component={LearnComponent} navTransparent={true}/>
          <Scene key = "ResultsComponent" component={ResultsComponent} navTransparent={true} />
          <Scene key = "ConversationLanguage" component={ConversationLanguage} navTransparent={true} />
          <Scene key = "ConversationComponent" component={ConversationComponent} navTransparent={true} />
       </Scene>
    </Router>
  )

export default Routes