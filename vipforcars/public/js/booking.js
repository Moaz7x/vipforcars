async function sendToWhatsApp() {
    // 1. Check if Terms are accepted
    if (!document.getElementById('terms').checked) {
        alert("Please agree to the Terms and Conditions first.");
        return;
    }

    // Change button text to show loading
    const btn = document.querySelector('button[onclick="sendToWhatsApp()"]');
    const originalText = btn.innerText;
    btn.innerText = "PROCESSING...";
    btn.disabled = true;

    // 2. Collect all data (Added trip_type and backup_phone)
    const bookingData = {
        trip_type: document.querySelector('input[name="trip_type"]:checked')?.value || 'N/A',
        province: document.getElementById('province').value || 'N/A',
        departure: document.getElementById('departure').value || 'N/A',
        destination: document.getElementById('destination').value || 'N/A',
        date: document.getElementById('date').value || 'N/A',
        time: document.getElementById('time').value || 'N/A',
        direction: document.querySelector('input[name="direction"]:checked')?.value || 'N/A',
        bags: document.querySelector('input[name="bags"]:checked')?.value || 'N/A',
        car_type: document.querySelector('input[name="car_type"]:checked')?.value || 'N/A',
        airport: document.getElementById('airport').checked ? "Yes / نعم" : "No / لا",
        customer_name: document.getElementById('customer_name').value || 'N/A',
        customer_phone: document.getElementById('customer_phone').value || 'N/A',
        backup_phone: document.getElementById('backup_phone').value || 'N/A',
        passengers: document.getElementById('passengers').value || '1',
        notes: document.getElementById('notes').value || 'None'
    };

    try {
        // 3. Send to Backend to save in Supabase and generate Trip Number
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        const tripNum = result.tripNum; // The auto-generated number from backend

        // 4. Format the WhatsApp message
        const message = `✨ *New VIP Booking Request* ✨
--------------------------------
🆔 *Trip ID:* ${tripNum}
🛣️ *Trip Type:* ${bookingData.trip_type}
📍 *Province:* ${bookingData.province}
🛫 *From:* ${bookingData.departure}
🏁 *To:* ${bookingData.destination}
📅 *Date:* ${bookingData.date}
⏰ *Time:* ${bookingData.time}
--------------------------------
🔄 *Direction:* ${bookingData.direction}
✈️ *Airport Trip:* ${bookingData.airport}
🧳 *Bags:* ${bookingData.bags}
🚗 *Car:* ${bookingData.car_type}
--------------------------------
👤 *Customer:* ${bookingData.customer_name}
📞 *Phone:* ${bookingData.customer_phone}
📱 *Backup Phone:* ${bookingData.backup_phone}
👥 *Passengers:* ${bookingData.passengers}
📝 *Notes:* ${bookingData.notes}
--------------------------------`;

        // 5. Open WhatsApp
        const whatsappUrl = `https://wa.me/201111036937?text=${encodeURIComponent(message )}`;
        window.open(whatsappUrl, '_blank');

        // Reset form and button
        document.getElementById('bookingForm').reset();
        btn.innerText = originalText;
        btn.disabled = false;

    } catch (error) {
        alert("Error saving booking. Please try again.");
        btn.innerText = originalText;
        btn.disabled = false;
    }
}
