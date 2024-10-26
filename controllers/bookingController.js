import booking from "../models/bookings.js";
import { isCustomerValid } from "./userControllers.js";

export function createBooking(req, res) {
    if (!isCustomerValid(req)) {
        return res.status(401).json({ message: 'Invalid customer' });
    }

    const startingId = 1000;

    booking.countDocuments({})
        .then((count) => {
            const newId = startingId + count + 1;
            console.log(`Generated booking ID: ${newId}`);
            
            const newBooking = new booking({
                bookingId: newId,
                roomId: req.body.roomId,
                email: req.body.email,
                status: req.body.status,
                start: req.body.start,
                end: req.body.end,
                notes: req.body.notes || ''  // Optional field
            });

            return newBooking.save();
        })
        .then((result) => {
            res.status(201).json({
                message: 'Booking saved successfully',
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}
