import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/', (req, res) => res.status(200).send('API Working!!'));

app.listen(port, () => console.log(`Server running on port ${port}`));
