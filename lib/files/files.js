const fs = require('node:fs');
const path = require('node:path');
const speech = require('../speech/speech');

async function saveMp3(text)
{
  try {
    const code = strToCode(text);
    const filePath = path.normalize(__dirname + `../../../public/audio/${code}.mp3`);
    const fileExists = fs.existsSync(filePath);

    if(!fileExists) {
      console.log('creating audio: ', text);
      const audio = await speech.toMp3(text);
      if(!audio) throw new Error('Error: saveMp3()');
      await fs.writeFile(filePath, audio.audioContent, { encoding: 'base64', flag: 'w+' }, () => console.log('text.mp3 written'));
      return true;
    }
    console.log('audio exists: ', text);
    return true;
  } catch(e) {
    throw e;
  }
}


function strToCode(str)
{
  let code = '';
  for(let i in str) {
    code += str.codePointAt(i);
  }

  return code;
}


async function saveChar(character, data)
{
  try {
    const code = character.charCodeAt(0);
    const filePath = path.normalize(__dirname + `../../../public/chars/${code}.mp3`);
    if(!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, data, 'base64');
      console.log(`${character} SAVED: ${code}.mp3`);
    } else {
      console.log(`${character} ALREADY EXISTS: ${code}.mp3`);
    }
    return true;
  } catch(err) {
    console.error(err);
    return false;
  }
}


async function saveLine(dir = 'test', file, data)
{
  try {
    const dirPath = path.normalize(__dirname + '../../../public/test');
    const exists = fs.existsSync(dirPath);
    if(exists) {
      console.log('dir exists');
    } else {
      fs.mkdirSync(dirPath);
    }
    return true;
  } catch(e) {
    console.error(e);
    return false;
  }
}




function charExists(character)
{
  const code = character.codePointAt(0);
  //const filePath = path.join(dirname, `chars/${code}.mp3`);
  const filePath = `public/chars/${code}.mp3`
  const fileExists = fs.existsSync(filePath);
  return fileExists;
}


function deleteOld()
{
  try {
    const allFiles = fs.readdirSync(dirPath);
    const files = allFiles.filter(file => file !== 'chars');

    files.forEach(file => fs.rmSync(`${dirPath}${file}`));

    return true;
  } catch(err) {
    console.error(err);
    return false;
  }
}



module.exports = { saveMp3 };
