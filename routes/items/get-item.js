const router = require('express').Router();
const Item = require('../../models/Item');

router.get(`/items/:id`, async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id });

        res.send(item);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
