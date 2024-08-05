const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel') ; // Adjust the path as necessary
const OTP = require('../models/otpModel');

const router = express.Router();

// Email configuration (use your own email service credentials)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'antimabhatra82@gmail.com',
        pass: 'hvfr ejbp qlos swak'
    }
});

// Generate random OTP
function generateOTP() {
    return crypto.randomBytes(3).toString('hex'); // Generates a 6-digit OTP
}

// Forgot password endpoint
router.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

         // Generate OTP
         const otp = generateOTP();

         // Save OTP to the database (with an expiration time)
         const otpEntry = new OTP({
             email: email,
             otp: otp,
             createdAt: Date.now(),
             expiresAt: Date.now() + 2 * 60 * 1000 // OTP expires in 2 minutes
         });
         await otpEntry.save();

        const mailOptions = {
            to: user.email,
            from: 'bhatraantima41@gmail.com',
            subject: 'Password Reset',
            text: otp
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).send({ error: 'Error sending email' });
            }
            res.status(200).send({ message: 'Password reset link sent successfully' });
        });
    } catch (error) {
        console.log({error})
        res.status(500).send({ error: 'Server error' });
    }
});

// OTP verification endpoint
router.post('/verify', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the OTP entry in the database
        const otpEntry = await OTP.findOne({ email, otp });

        if (!otpEntry) {
            return res.status(400).send({ error: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (Date.now() > otpEntry.expiresAt) {
            return res.status(400).send({ error: 'OTP expired' });
        }

        // OTP is valid, allow the user to proceed with password reset
        res.status(200).send({ message: 'OTP verified successfully' });

        // Optionally, you can delete the OTP entry after successful verification
        await OTP.deleteOne({ email, otp });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send({ error: 'Server error' });
    }
});

// Password reset endpoint
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: 'User is not found' });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 6);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

module.exports = router;
