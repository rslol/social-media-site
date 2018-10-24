const   express         = require('express'),
        router          = express.Router();

// @route   Get api/profile/test
// @desc    Test profile Route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

module.exports = router;