import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import process from 'process';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
