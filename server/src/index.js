require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
const logs = require('./api/logs');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}
));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Hello World!",
    });
});

app.use('/api/logs', logs);


//not found error middleware
app.use(middlewares.notFound);

//other routes general error like token check middleware
app.use(middlewares.errorHandler);
const port = process.env.PORT || 1337;
app.listen(port , () => {
    console.log(`Listening at https://localhost:${port}`);

});

