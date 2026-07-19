const supabase = require('./config/supabase');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        console.log('Connecting to Supabase...');

        // 1. Clear existing data (optional, prevents duplicates during testing)
        await supabase.from('admins').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('vehicles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        console.log('Previous data cleared.');

        // 2. Hash the password for the Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // 3. Insert Admin
        const { data: admin, error: adminError } = await supabase
            .from('admins')
            .insert([{ username: 'admin', password: hashedPassword }])
            .select();
            
        if (adminError) throw adminError;
        console.log(`Admin created successfully: ${admin[0].username}`);

        // 4. Insert Vehicle
        const { data: vehicle, error: vehicleError } = await supabase
            .from('vehicles')
            .insert([{
                name: 'Mercedes-Benz S-Class',
                category: 'Sedan',
                passengers: 3,
                luggage: 2,
                image_url: '/images/s-class.jpg',
                desc_en: 'The ultimate luxury sedan for VIP transport.',
                desc_ar: 'سيارة السيدان الفاخرة المطلقة لنقل كبار الشخصيات.'
            }])
            .select();

        if (vehicleError) throw vehicleError;
        console.log(`Vehicle created successfully: ${vehicle[0].name}`);

        console.log('Database seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error seeding database:`, error.message || error);
        process.exit(1);
    }
};

seedDatabase();
