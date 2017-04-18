import { Strategy } from 'passport-twitter';
import User from './models/User.js';


export default passport => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new Strategy({
        consumerKey: process.env.PASSPORT_KEY,
        consumerSecret: process.env.PASSPORT_SECRET,
        callbackURL: `https://megaboy-nightlife-app.herokuapp.com/api/loginSuccess`
    }, (token, tokenSecret, profile, done) => {
        process.nextTick(() => {
            User.find({username: profile.username}, (err, users) => {
                if (err)
                    return done(err);

                if (users.length > 0) {
                    return done(null, users[0]);
                }
                else {
                    let newUser = new User();
                    newUser.username = profile.username;

                    newUser.save(err => {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};