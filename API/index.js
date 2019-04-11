import express from 'express';

// setup express application
const app = express();

// setup PORT to be used
const { PORT = 5000 } = process.env;

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('The API is working');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on PORT ${PORT}`);
});
