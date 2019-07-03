import { handleActions } from 'redux-actions'
import Actions from '../Actions/Types'


const INITIAL_STATE = {
    original_text: '',
    translated_text: '',
    sl: 'fr',
    tl: 'en',
    coefTL:1,
    coefSL:1,
    flagSL:'FR',
    flagTL: 'US',
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
    [Actions.ORIGINAL_TEXT]: (state,action) => {
        return Object.assign({}, state, { 
            original_text:action.original_text,
        })
    },
    [Actions.TRANSLATE_SUCCESS]: (state,action) => {
        return Object.assign({}, state, { 
            translated_text:action.translated_text,
        })
    },
    [Actions.PLAY_AGAIN]: (state,action) => {
        return Object.assign({}, state, { 
            translated_text:action.infoplayer.translated_text,
            original_text:action.infoplayer.original_text,
            coefSL:action.infoplayer.coefSL,
            flagSL: action.infoplayer.flagSL,
            coefTL:action.infoplayer.coefTL,
            flagTL: action.infoplayer.flagTL,
            tl:action.infoplayer.tl,
            sl:action.infoplayer.sl
        })
    }
}

export default handleActions(reducerMap, INITIAL_STATE)