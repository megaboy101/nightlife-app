/* eslint-disable no-console */
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import router from './routes.js';
import authConfig from './passport.config.js';


const port = process.env.PORT;
const app = express();

mongoose.connect(`mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds153730.mlab.com:53730/nightlife-app`);

authConfig(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('dist'));


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
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.listen(port, (err) => {
    if (err)
        throw err;

    console.log('Production server running on port: ' + port);
});