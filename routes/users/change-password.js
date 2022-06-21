const User = require('../../models/User');
const router = require('express').Router();
const bcrypt = require('bcryptjs');

router.post('/password', async (req, res) => {
    const user = await User.findOne({ _id: req.body._id });

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        await User.updateOne(
            {
                _id: req.body._id
            },
            {
                password: hashedPassword
            }
        );
        res.send(hashedPassword);
    } catch {
        res.status(400).send(err);
    }
});

module.exports = router;
