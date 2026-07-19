const supabase = require('../config/supabase');

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = async (req, res) => {
    try {
        const { data: vehicles, error } = await supabase
            .from('vehicles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.status(200).json({ success: true, count: vehicles.length, data: vehicles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = async (req, res) => {
    try {
        const { data: vehicle, error } = await supabase
            .from('vehicles')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error || !vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Create new vehicle
// @route   POST /api/vehicles
// @access  Private (Admin only)
const createVehicle = async (req, res) => {
    try {
        const { data: vehicle, error } = await supabase
            .from('vehicles')
            .insert([req.body])
            .select();

        if (error) throw error;
        res.status(201).json({ success: true, data: vehicle[0] });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to create vehicle', error: error.message });
    }
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private (Admin only)
const updateVehicle = async (req, res) => {
    try {
        const { data: vehicle, error } = await supabase
            .from('vehicles')
            .update(req.body)
            .eq('id', req.params.id)
            .select();

        if (error || vehicle.length === 0) {
            return res.status(404).json({ success: false, message: 'Vehicle not found or update failed' });
        }
        res.status(200).json({ success: true, data: vehicle[0] });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to update vehicle', error: error.message });
    }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private (Admin only)
const deleteVehicle = async (req, res) => {
    try {
        const { error } = await supabase
            .from('vehicles')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.status(200).json({ success: true, message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to delete vehicle', error: error.message });
    }
};

module.exports = {
    getVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};
