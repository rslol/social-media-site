const   express                 = require('express'),
        router                  = express.Router(),
        User                    = require('../../models/User'),
        gravatar                = require('gravatar'),
        bcrypt                  = require('bcryptjs'),
        jwt                     = require('jsonwebtoken'),
        key                     = require('../../config/keys'),
        passport                = require('passport'),
        // Load Input Validation
        validateRegisterInput   = require('../../validation/register'),
        validateLoginInput      = require('../../validation/login');


// @route   Get api/users/test
// @desc    Test users Route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route   Get api/users/register
// @desc    Test users Route
// @access  Public
router.post('/register', (req, res) => {
    const { err, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(err);
    }

    //Check to see if email already exist in database
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                err.email = 'Email already exists';
                return res.status(400).json(err);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size,
                    r: 'pg', //rating
                    d: 'mm' //default image
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                //How to hash passwords with bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err);
                        }
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
});

// @route   Get api/users/login
// @desc    Login User / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { err, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(err);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({ email })
        .then(user => {
            //Check for user
            if(!user) {
                err.email = 'User not found';
                return res.status(404).json(err);
            } 
            //Check password
            //Compare the inputed password to the hash password in the DB
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //User matched, all the information needed from the sucessful login
                        const payload = { id: user.id, name: user.name, avatar: user.avatar } //Create JWT Payload
                        //Sign token
                        jwt.sign(
                            payload, 
                            key.secret, 
                            { expiresIn: 3600 }, 
                            (err, token) => {
                                res.json({
                                    success: true, 
                                    token: 'Bearer ' + token
                                });
                        });
                    } else {
                        err.passowrd = 'Incorrect Password';
                        return res.status(400).json(err);
                    }
                });
        });
});

// @route   Get api/users/current
// @desc    Return Current User
// @access  Private 
router.get('/current', passport.authenticate('jwt', { session: false }), (req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});




module.exports = router;