const schedule = require('node-schedule');

const fs = require('node:fs');
const path = require('node:path');

const dirPath = path.normalize(__dirname + `../../../public/users/`);
const jobTime = 10;

const job = schedule.scheduleJob(`*/${jobTime} * * * *`, async function(){
  try {
    const files = fs.readdirSync(dirPath);
    for(const file of files) {
      const userPath = dirPath + file;
      const stat = fs.statSync(userPath); 
      const minutes = toMinutes(stat.mtimeMs)
      if(minutes >= jobTime) {
        console.log('removing directory ', file);
        fs.rmdirSync(userPath); 
      }
    }
  } catch(e) {
    console.error(e);
    return false;
  }
});


function toMinutes(mtime)
{
  const date = Date.now();
  const elapsed = date - mtime;
  return elapsed / 60000;
}
