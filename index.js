const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = parseInt(process.env.PORT) || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));

/* FIX LATER */
if(process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  app.use(cors());
  //app.disable('x-powered-by')
  //app.use(helmet());
}



app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/audio', require('./routes/audio/audio'));
app.use('/text', require('./routes/text/text'));
app.use('/', require('./routes/error/error'));




app.listen(port, () => console.log(`Server listening on port: ${port}`));
