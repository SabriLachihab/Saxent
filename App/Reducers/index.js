import { combineReducers } from 'redux';
import GTReducers from './GTReducers'
import ScoresReducers from './ScoresReducers'
import ConversationReducers from './ConversationReducers'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  // the keys here are going to be the property of state that we are producing.
  form: formReducer,
  googleTrad: GTReducers,
  scores: ScoresReducers,
  conversation: ConversationReducers
})
