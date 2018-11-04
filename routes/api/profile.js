const   express         = require('express'),
        router          = express.Router(),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        // Load DB Models
        Profile         = require('../../models/Profile'),
        User            = require('../../models/User');

// @route   Get api/profile/test
// @desc    Test profile Route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

// @route   Get api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => { 
    const err = {};  
    // We want to get the user profile from the token
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(!profile) {
                err.noprofile = 'No profile for this user';
                res.status(404).json(err);
            } 
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create or Edit User Profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { 
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    // if single, no curly brances needed
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skills - Split into an array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // Social (line 50 is initializing social as an object because it is an object in the DB Schema)
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    // req.user.id is how to get the logged in user
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(profile) {
                // This is an update
                Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                // This responds with the new profile
                ).then(profile => res.json(profile));
            } else {
            // Create a profile 
                // Check to see if handle exist
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    if(profile) {
                        errors.handle = 'That handle already exist';
                        res.status(400).json(err);
                    }
                    // Save Profile 
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })
});

module.exports = router;