require('dotenv').config();
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import UserApiController from './api/UserApiController';
import { expressJwtConfig, expressJwtErrorHandler } from './config';

const app       = express();
const PORT      = process.env.PORT || 3001;
const SECRET    = process.env.SECRET;
const NODE_ENV  = process.env.NODE_ENV;
const MONGO_URI = process.env.MONGO_URI;

let publicDir;
if(NODE_ENV === 'production') {
  publicDir = path.resolve(__dirname, 'public');
} else {
  publicDir = path.resolve(__dirname, 'client', 'public');
  app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(publicDir));
app.use(expressJwt(expressJwtConfig(SECRET)));
app.use(expressJwtErrorHandler);

// api controllers
UserApiController(app, { secret: SECRET });

app.listen(PORT, () => console.log(`listening on port ${PORT}`));