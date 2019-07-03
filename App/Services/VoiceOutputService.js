var Speech = require('react-native-speech')

const VoiceOutputService = {
    voiceOutput
}

function voiceOutput(text,voice) {
    console.log(text + voice)
    console.log(Speech)
    Speech.speak({
        text: text,
        voice: voice
      })
}

export default VoiceOutputService