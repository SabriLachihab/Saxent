import { handleActions } from 'redux-actions'
import Actions from '../Actions/Types'


const INITIAL_STATE = {
    sl: 'fr',
    tl: 'en',
    coefTL:1,
    coefSL:1,
    flagSL:'FR',
    flagTL: 'US',
    translated_text: '',
  }

const reducerMap = {

    [Actions.CHANGE_INITIAL_LANGUAGE]: (state,action) => {
        console.log(action)
        return Object.assign({}, state, { 
            sl:action.sl,
            coefSL:action.coefSL,
            flagSL: action.flagSL
        })
    },
    [Actions.CHANGE_FINAL_LANGUAGE]: (state,action) => {
        return Object.assign({}, state, { 
            tl:action.tl,
            coefTL:action.coefTL,
            flagTL: action.flagTL
        })
    },
    [Actions.TRANSLATE_SUCCESS]: (state,action) => {
        return Object.assign({}, state, { 
            translated_text:action.translated_text,
        })
    }
}

export default handleActions(reducerMap, INITIAL_STATE)