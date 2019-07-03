import Voice from 'react-native-voice'

const VoiceRecognition = {
    _startRecognition,
    stopRecogntion,
    removeAccents
}

async function _startRecognition(langageISO) {
    try {
      await Voice.start(langageISO);
    } catch (e) {
      console.error(e);
    }
  }

function stopRecogntion() {
    Voice.stop()
}

function removeAccents(string) {
  const accents =
    "ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź";
  const accentsOut =
    "AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz";
  return string
    .split("")
    .map((letter, index) => {
      const accentIndex = accents.indexOf(letter);
      return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
    })
    .join("");
}

export default VoiceRecognition