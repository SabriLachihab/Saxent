import { handleActions } from 'redux-actions'
import Actions from '../Actions/Types'


const INITIAL_STATE = {
    ranking:[],
  }

const reducerMap = {
    [Actions.ADD_NEW_PLAYER]: (state,action) => {
        let array = JSON.parse(JSON.stringify(state.ranking))
        array.push(action.infoPlayer)
        return Object.assign({}, state, { 
            ranking:array
        })
    },
}

export default handleActions(reducerMap, INITIAL_STATE)