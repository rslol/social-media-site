const   express                 = require('express'),
        router                  = express.Router(),
        mongoose                = require('mongoose'),
        passport                = require('passport'),
        // Load DB Models
        Profile                 = require('../../models/Profile'),
        User                    = require('../../models/User'),
        validateProfileInput    = require('../../validation/profile');
        validateExperienceInput = require('../../validation/experience');
        validateEducationInput  = require('../../validation/education');


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
        .populate('users', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                err.noprofile = 'No profile for this user';
                return res.status(404).json(err);
            } 
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const err = {};
    // req.params.handle targets the /:handle in the url
    // Since /:handle is unique to the user, thats how we get the user profile
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                err.noprofile = 'This profile does not exist';
                return res.status(404).json(err);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
    const err = {};
    Profile.findOne({ handle: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                err.noprofile = 'This profile does not exist';
                return res.status(404).json(err);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({ profile: 'This profile does not exist' }));
});


// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
routner.get('/all', (req, res) => {
    const err = {};
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            err.noprofiles = 'No profiles were found';
            return res.status(404).json(err);
        }
        res.json(profiles);
    })
    .catch(err => res.statsus(404).json({ profiles: 'No profiles were found'}));
})


// @route   POST api/profile
// @desc    Create or Edit User Profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { 
    const  { err, isValid } = validateProfileInput(req.body);
    // Check validation
    if(!isValid) {
        // Return Error with 400 status
        return res.status(400).json(err)
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    // If if statement is a single line, no curly brances needed
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
                        return res.status(400).json(err);
                    }
                    // Save Profile 
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const  { err, isValid } = validateExperienceInput(req.body);
    // Check validation
    if(!isValid) {
        // Return Error with 400 status
        return res.status(400).json(err)
    }
    Profile.findOne({ user: req.user.id})
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            //  Add to experience array
            //  unshift adds the data to the beginning of the array
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile));
        })
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const  { err, isValid } = validateEducationInput(req.body);
    // Check validation
    if(!isValid) {
        // Return Error with 400 status
        return res.status(400).json(err)
    }
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            //  Add to education array
            //  unshift adds the data to the beginning of the array
            profile.education.unshift(newEdu);
            profile.save().then(profile => res.json(profile));
        })
});

// @route   Delete api/profile/experience/:exp_id
// @desc    Delete experience to profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);
            // Splice out of array
            profile.experience.splice(removeIndex, 1);
            // Save
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
});

// @route   Delete api/profile/education/:edu_id
// @desc    Delete experience to profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.du_id);
            // Splice out of array
            profile.education.splice(removeIndex, 1);
            // Save
            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
});

// @route   Delete api/profile
// @desc    Delete user and profile 
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: true }));
        });
});

module.exports = router;