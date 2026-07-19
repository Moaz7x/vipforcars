const express = require('express');
const router = express.Router();
const multer = require('multer');
const { requireAuth } = require('../middlewares/authMiddleware');
const { 
    renderLogin, getDashboard, 
    addVehicle, deleteVehicle, 
    deleteBooking, updateBookingStatus,
    addArticle, deleteArticle 
} = require('../controllers/adminController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/login', renderLogin);

router.use(requireAuth);

router.get('/', (req, res) => res.redirect('/admin/dashboard'));
router.get('/dashboard', getDashboard);

// Vehicle Routes
router.post('/vehicles', upload.single('image'), addVehicle); 
router.post('/vehicles/delete/:id', deleteVehicle);

// Booking Routes
router.post('/bookings/delete/:id', deleteBooking);
router.post('/bookings/status/:id', updateBookingStatus);

// Article Routes
router.post('/articles', upload.single('image'), addArticle);
router.post('/articles/delete/:id', deleteArticle);

module.exports = router;
