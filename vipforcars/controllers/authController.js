const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

// @desc    Render login page
// @route   GET /api/auth/login
const renderLogin = (req, res) => {
    res.render('login');
};

// @desc    Login admin & get token
// @route   POST /api/auth/login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Please provide username and password' });
        }

        // 1. Fetch admin from Supabase
        const { data: admin, error } = await supabase
            .from('admins')
            .select('*')
            .eq('username', username)
            .single(); // .single() ensures we get one object, not an array

        if (error || !admin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 2. Verify password using bcrypt
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 3. Create JWT Payload
        const payload = { id: admin.id, username: admin.username };

        // 4. Sign Token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { 
            expiresIn: '1d' 
        });

        // 5. Set JWT in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        } );

        res.status(200).json({ success: true, message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Logout admin / clear cookie
// @route   GET /api/auth/logout
const logout = (req, res) => {
    res.clearCookie('token'); // Properly deletes the cookie
    res.redirect('/admin/login'); // Redirects to the login page
};


module.exports = { renderLogin, login, logout };
