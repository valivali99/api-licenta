const nodemailer = require('nodemailer');
const router = require('express').Router();

router.post('', async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'musifyshop@gmail.com',
            pass: 'valica99'
        }
    });

    const info = {
        from: 'musifyshop@gmail.com', // sender address
        to: req.body.mail, // list of receivers
        subject: 'Musify Shop', // Subject line
        text: `Musify's Newsletter`, // plain text body
        html: '<h1>Thanks for subscribing to our newsletter</h1>' // html body
    };

    transporter.sendMail(info, function (error, info) {
        try {
            res.send('mail sent');
        } catch {
            res.status(400).send(err);
            return;
        }
    });
});

module.exports = router;
