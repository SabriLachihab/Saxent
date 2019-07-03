import VoiceRecognition from '../Services/VoiceRecognition'
import Types from './Types'

function translateAttempt() {
  return {
    type: Types.TRANSLATE_ATTEMPT
  }
}

function translateSuccess(response) {
  return {
    type: Types.TRANSLATE_SUCCESS,
    translated_text: decodeURI(response[0][0][0])
  }
}

function translateFailure(message) {
  return {
    type: Types.TRANSLATE_FAILURE,
    payload: {
      message
    }
  }
}

export function fetchTranslate(result,init,final) {
  return function (dispatch) {
    dispatch(translateAttempt())
    var resultat = encodeURI(VoiceRecognition.removeAccents(result))
    let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl='+init+'&tl='+final+'&dt=t&q='+resultat
    return fetch(url,{timeout: 10000})
      .then(response => {
        if (response.status >= 400) {
          dispatch(translateFailure("Bad response from server"));
        }
        return response.json();
      })
      .then(response => {
        console.log(response)
        dispatch(translateSuccess(response))
      })
      .catch(()=> {
        dispatch(translateFailure("Bad response from server"))
      })
    }
}

export function changeSL(language,coefSL,flagSL){
  return {
    type: Types.CHANGE_INITIAL_LANGUAGE,
    sl: language,
    coefSL: coefSL,
    flagSL: flagSL
  }
}

export function changeTL(language,coefTL,flagTL){
  return {
    type: Types.CHANGE_FINAL_LANGUAGE,
    tl: language,
    coefTL: coefTL,
    flagTL: flagTL
  }
}

export function originalText(original_text){
  return {
    type: Types.ORIGINAL_TEXT,
    original_text
  }
}