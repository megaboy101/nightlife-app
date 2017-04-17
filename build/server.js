/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';
import config from '../webpack.config.dev.js';
import router from './routes.js';
import authConfig from './passport.config.js';


const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);


mongoose.connect(`mongodb://megaboy101:thejacob@ds153730.mlab.com:53730/nightlife-app`);

app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath
}));

authConfig(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(session({
    secret: 'kendrick',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false
    }
}));

app.use(passport.initialize());
app.use(passport.session());




app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});


app.listen(port, (err) => {
    if (err)
        throw err;

    console.log('Server running on port: ' + port);
});