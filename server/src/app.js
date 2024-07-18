const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const authRouter = require('./routes/auth.router');
const tokenRouter = require('./routes/token.router');
const petRouter = require('./routes/pet.router');
const accountRouter = require('./routes/account.router');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);

app.use('/api/pets', petRouter);
app.use('/api/account', accountRouter);

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;
