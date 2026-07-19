const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const WebSocket = require('ws'); // Import the ws package

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env file');
    process.exit(1);
}

// Initialize Supabase with the WebSocket transport
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false // Recommended for backend server environments
    },
    realtime: {
        transport: WebSocket // Fixes the Node.js 20 WebSocket error
    }
});

module.exports = supabase;
