const   express         = require('express'),
        router          = express.Router(),
        User            = require('../../models/User'),
        gravatar        = require('gravatar'),
        bcypt           = require('bcryptjs');

// @route   Get api/users/test
// @desc    Test users Route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route   Get api/users/register
// @desc    Test users Route
// @access  Public
router.post('/register', (req, res) => {
    //Check to see if email already exist in database
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({ email: 'Email already exist'});
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
                    bcypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
});

module.exports = router;