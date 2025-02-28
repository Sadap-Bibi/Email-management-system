const sendEmail = require('../utils/emailSender');
const Email = require('../models/email.model')
const mongoose = require('mongoose')

exports.emailSender = async (req, res) => {
    try {
        const { from, to, subject, message } = req.body;

        if (!from || !to || !subject || !message) {
            return res.status(400).json({ message: "All fields (from, to, subject, message) are required" });
        }
        
        // Send email
        const response = await sendEmail(to, subject, message);

        if (response.success) {
            // Save email to database (Include `from`)
            const email = new Email({ from, to, subject, message });
            await email.save();

            return res.status(200).json({ message: 'Email sent and saved successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.viewEmailSending = async (req, res) => {
    try {
        const { userEmail } = req.params;

        if (!userEmail) {
            return res.status(400).json({ message: "User email is required" });
        }

        const emails = await Email.find({ to: userEmail }).sort({ createdAt: -1 });

        res.status(200).json(emails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// controllers/email.controller.js
exports.markEmailAsRead = async (req, res) => {
    try {
        const emailId = req.params.emailId;

        // Find the email by ID and update the 'read' status
        const email = await Email.findByIdAndUpdate(emailId, { read: true }, { new: true });
        
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.status(200).json({ message: 'Email marked as read', email });
    } catch (error) {
        console.error('Error marking email as read:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteEmail = async (req, res) => {
    try {
      // Extract the emailId from the request parameters
      const { emailId } = req.params;
  
      // Check if the emailId is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(emailId)) {
        return res.status(400).json({ message: 'Invalid email ID format' });
      }
  
      // Attempt to find and delete the email by its ID
      const email = await Email.findByIdAndDelete(emailId);
  
      // If the email doesn't exist, return a 404 error
      if (!email) {
        return res.status(404).json({ message: 'Email not found' });
      }
  
      // Successfully deleted the email, return success response
      res.status(200).json({ message: 'Email deleted successfully' });
  
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error('Error deleting email:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// search term from query parameter
exports.searchEmails = async (req, res) => {
    try {
        
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const emails = await Email.find({
            $text: { $search: query } 
        });

        if (emails.length === 0) {
            return res.status(404).json({ message: 'No emails found' });
        }

        res.status(200).json(emails); 
    } catch (error) {
        console.error('Error searching emails:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// const Email = require('../models/email.model')
// Controller to get all messages
exports.getAllMessages = async (req, res) => {
    try {
      const messages = await Email.find(); // Get all messages
      res.status(200).json(messages); // Send response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching messages" });
    }
  };