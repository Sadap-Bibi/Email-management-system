// const { register, login, logout } = require("../controllers/user.controller")

const express = require('express');
const { emailSender, viewEmailSending, markEmailAsRead, deleteEmail, searchEmails, getAllMessages,  } = require('../controllers/email.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router =  express.Router()


router.post('/send-email',authMiddleware,emailSender)

router.get('/inbox/:userEmail', authMiddleware, viewEmailSending);

router.put('/mark-read/:emailId',authMiddleware, markEmailAsRead );

router.delete('/messages/:emailId', authMiddleware, deleteEmail);

router.get('/search',authMiddleware,searchEmails)

router.get('/messages', getAllMessages);

module.exports = router;