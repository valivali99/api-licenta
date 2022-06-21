const router = require('express').Router();

router.get(`/mock`, async (req, res) => {
    res.send('Hello World');
});

module.exports = router;
