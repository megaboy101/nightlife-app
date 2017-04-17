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
        consumerKey: 'lhpEHhC16JimM7xJf2DdwIzOX',
        consumerSecret: 'JvPyVRwJQNNISvXqu0jcp2GZpYB7fGCAUvIyYmTsmEBMTLlhwj',
        callbackURL: `http://localhost:3000/api/loginSuccess`
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