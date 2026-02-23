import { openDB } from './src/configDB.js';
import user from './routes/User.js';
import express from 'express';
import cors from 'cors';
import { createTable } from './controller/User.js';

const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

app.use('/user', user);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})

// m4pYu4OJbyEhTFgU