import {connectDB} from './config/db.js';
import {env} from './config/env.js';
import app from './app.js';

connectDB().then(() => {
  app.listen(env.port, () => console.log(`🚀 Server on :${env.port}`));
});