const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('config');

const PORT = config.get('port') || 5000;

app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Success DB connection');
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

app.listen(PORT, ()=>{console.log(`App listen port ${PORT}`)})