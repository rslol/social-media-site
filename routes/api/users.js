const   express         = require('express'),
        router          = express.Router();

// @route   Get api/users/test
// @desc    Test users Route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

module.exports = router;