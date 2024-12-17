const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const connectDB = require('./config/database');  // Import the MongoDB connection

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// Home Redirect
app.get('/', (req, res) => {
    res.redirect('/read');
});

// Create User Form
app.get('/create', (req, res) => {
    res.render('create');
});

// Create User
app.post('/create', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        console.log('User created:', user);
        res.render('success', { message: 'User Created Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Read Users
app.get('/read', async (req, res) => {
    try {
        const users = await User.find();
        console.log('Users retrieved:', users);
        res.render('read', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update User Form
app.get('/update/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('update', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update User
app.post('/update/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, password },
            { new: true }
        );
        console.log('User updated:', user);
        res.render('success', { message: 'User Updated Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete User
app.post('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        console.log('User deleted:', user);
        res.render('success', { message: 'User Deleted Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
