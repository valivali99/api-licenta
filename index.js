const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
var cors = require('cors');

// Import Routes
const authRoutes = require('./routes/auth');
const changePasswordRoute = require('./routes/users/change-password');
const postItemRoute = require('./routes/items/post-item');
const getItemsRoute = require('./routes/items/get-items');
const getItemByIdRoute = require('./routes/items/get-item');
const mailRoute = require('./routes/mail-sender/mail-sender');
const mockRoute = require('./routes/items/mock');

dotenv.config();

// Connect to db
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log('Connected to db');
});

// Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(cors());

// Route Middlewares
app.use('/api/user', authRoutes);
app.use('/api/store', postItemRoute);
app.use('/api/store', getItemsRoute);
app.use('/api/store', getItemByIdRoute);
app.use('/api/mail', mailRoute);
app.use('/api/mock', mockRoute);
app.use('/api/password', changePasswordRoute);

app.listen(3000, () => console.log('Running'));
