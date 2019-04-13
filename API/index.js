import Debug from 'debug';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const debug = Debug('http');
const { PORT = 5000 } = process.env; // setup PORT to be used
app.listen(PORT, () => {
  debug(`Server is running on PORT ${PORT}`);
});
