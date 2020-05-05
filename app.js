const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('config');

const PORT = config.get('port') || 3000;

app.listen(PORT, ()=>{console.log(`App listen port ${PORT}`)})