const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ projectId: 'trinity-360402' });
const target = 'en';


async function chineseToEnglish(text) {
  try {
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    return translations[0]
  } catch(e) {
    console.error(e);
    return '';
  }
}


module.exports = { chineseToEnglish };
