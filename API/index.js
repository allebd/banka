import express from 'express';

const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
  res.send('The API is working');
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
