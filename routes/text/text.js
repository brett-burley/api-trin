const express = require('express');
const translate = require('../../lib/translate/translate');

const router = express.Router();

router.post('/translate', async (req, res) => {
  try {
    const { text } = req.body;
    const english = await translate.chineseToEnglish(text); 
    res.send(english);
  } catch(e) {
    console.error(e);
    res.status(500).send('translation error');
  }
});


module.exports = router;
