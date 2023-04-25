const express = require('express');
const speech = require('../../lib/speech/speech');
const files = require('../../lib/files/files');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { text } = req.body;
    console.log('/create text', text);

    await files.saveMp3(text);

    res.send(true);
  } catch(e) {
    console.error(e);
    res.send(false);
  }
});


router.get('/mp3', async (req, res) => {
  try {
    const text = req.query.text;

    const audio = await speech.toMp3(text);

    if(audio.audioContent) {
      console.log('SENDING AUDIO');
      res.send(audio.audioContent);
    }

    res.send('');
  } catch(e) {
    console.error(e)
    res.status(500).send('to audio error');
  }
})

module.exports = router;
