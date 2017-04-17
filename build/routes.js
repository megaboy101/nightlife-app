import { Router } from 'express';
import passport from 'passport';
import Drip from './models/Drip.js';
import fetch from 'isomorphic-fetch';


const router = Router();


// Authentication routes
router.get('/login',
	passport.authenticate('twitter'));

router.get('/loginSuccess', passport.authenticate('twitter'), (req, res) => {
    res.redirect('/');
});

// Ajax calls
router.get('/searchBars/:searchTerm', (req, res) => {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+${req.params.searchTerm}&key=AIzaSyDJ96DTAQB79h21xiOmVcSqV0vd8sKF0mY`)
    .then(data => data.json())
    .then(places => {
        res.send(places.results);
    })
    .catch(err => console.log('err'));
});

router.get('/searchImage/:reference', (req, res) => {
    fetch(`https://maps.googleapis.com/maps/api/place/photo?photoreference=${req.params.reference}&maxwidth=256&key=AIzaSyDJ96DTAQB79h21xiOmVcSqV0vd8sKF0mY`)
    .then(image => {
        res.send(image);
    });
});

// Database routes
router.route('/drips')
    .get((req, res) => {
        Drip.find((err, drips) => {
            if (err)
                res.send(err);
            res.json(drips);
        });
    })
    .post((req, res) => {
        let drip = new Drip();

        drip.name = req.body.name;
        drip.droppers = [req.body.dropper];

        drip.save(err => {
            if (err)
                res.send(err);
            res.send(drip._id);
        });
    });

router.route('/drips/:dripId')
    .put((req, res) => {
        Drip.findById(req.params.dripId, (err, drip) => {
            if (err)
                res.send(err);
            
            drip.droppers.push(req.body.dropper);
            drip.markModified('droppers');

            drip.save(err => {
                if (err)
                    res.send(err);
                res.end('Dropper added to drip');
            });
        });
    })
    .delete((req, res) => {
        Drip.findById(req.params.dripId, (err, drip) => {
            if (err)
                res.send(err);

            drip.droppers.splice(drip.droppers.indexOf(req.body.dropper));
            drip.markModified('droppers');

            drip.save(err => {
                if (err)
                    res.send(err);
                res.end('Dropper removed from drip');
            });
        });
    });

router.get('/currentUser', (req, res) => {
    res.send(req.user);
});


export default router;
