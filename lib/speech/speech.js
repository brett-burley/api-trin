const axios = require('axios');
const fs = require('fs');


async function toMp3(text) {
  try {
    const res = await axios({ method: 'post',
      url: 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyBEyPTw_prwSnfFea4TabD4mlBKbRa3Ozw',
      data: {
        "audioConfig": {
          "audioEncoding": "MP3",
          "pitch": 0,
          "speakingRate": 1
        },
        "input": {
          "text": `${text}`
        },
        "voice": {
          "languageCode": "cmn-CN",
          "name": "cmn-CN-Standard-C"
        }
      }
    });

   return res.data;
  } catch(err) {
    console.log('toMp3 error', err.message);
    return false;
  }
}


module.exports = { toMp3 };
