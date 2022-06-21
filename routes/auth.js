const router = require('express').Router();
const User = require('../models/User');
const { registerValidation } = require('../validators/user-validators/register-validation');
const { loginValidation } = require('../validators/user-validators/login-validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        date: req.body.date
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user.__id });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email or password is wrong');

    const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email, date: user.date, password: user.password },
        process.env.TOKEN_SECRET
    );

    res.header('auth-token', token).send(JSON.stringify(token));
});

module.exports = router;
