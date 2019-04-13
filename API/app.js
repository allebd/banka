import express from 'express';
import logger from 'morgan';
import route from './routes';

// calling an instance of express
const app = express();

// logging all request to console using morgan
app.use(logger('dev'));

// middlewares - parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  response.status(200).send('The API is working');
});

route(app);

export default app;
