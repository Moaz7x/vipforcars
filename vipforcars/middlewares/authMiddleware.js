const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

// For API routes (returns JSON)
const protect = async (req, res, next) => {
  let token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data: admin, error } = await supabase.from('admins').select('id, username').eq('id', decoded.id).single();

    if (error || !admin) return res.status(401).json({ success: false, message: 'Admin not found' });

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token failed' });
  }
};

// For EJS Views (Redirects to the NEW admin login page)
const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/admin/login'); // Fixed!
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data: admin, error } = await supabase.from('admins').select('id, username').eq('id', decoded.id).single();

    if (error || !admin) {
      return res.redirect('/admin/login'); // Fixed!
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.redirect('/admin/login'); // Fixed!
  }
};

module.exports = { protect, requireAuth };
