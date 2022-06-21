const router = require('express').Router();
const Item = require('../../models/Item');
const upload = require('../../middleware/upload');

router.post('/items', upload.single('image'), async (req, res) => {
    const item = new Item({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        color: req.body.color,
        manufacturer: req.body.manufacturer,
        isStock: req.body.isStock,
        description: req.body.description,
        rating: req.body.rating
    });

    if (req.file) {
        item.image = req.file.path;
    }

    try {
        const savedItem = await item.save();
        res.send({ item: item.__id });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
