const express = require('express');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const loginRoutes = require('./routes/loginRoutes');
const configRoutes = require("./routes/configRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use('/user', userRoutes);
app.use('/transaction', transactionRoutes);
app.use('/api', loginRoutes);
app.use('/config', configRoutes);

const PORT = process.env.PORT || 3000;

module.exports = app;