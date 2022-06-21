const router = require('express').Router();
const Item = require('../../models/Item');

router.get('/items', async (req, res) => {
    const items = await Item.find();

    try {
        res.send(items);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
