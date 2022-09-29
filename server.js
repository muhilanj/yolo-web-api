const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.get('/health', (req, res) => {
    res.send('Health is good.');
});

app.use('/api', require('./src/routes/property-route'));
app.use('/api', require('./src/routes/admin-property-route'));

app.listen(process.env.PORT, () => {
    console.log(`Server started running on ${process.env.PORT} for ${process.env.NODE_ENV}`);
});



