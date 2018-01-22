require('dotenv').config();
import path from 'path';
import express from 'express';
import UserApiController from './ApiControllers/UserApiController';

const app = express();
const PORT = process.env.PORT || 3001;
const env = process.env.NODE_ENV;

let publicDir;
if(env === 'production') {
  publicDir = path.resolve(__dirname, 'public');
} else {
  publicDir = path.resolve(__dirname, 'client', 'public');
  app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

app.use(express.static(publicDir));

// api controllers
UserApiController(app);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));