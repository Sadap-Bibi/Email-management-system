const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema(
    {
        from: { type: String, required: true },
        to: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
    },
    { timestamps: true } );

EmailSchema.index({ subject: 'text', message: 'text', from: 'text' });

module.exports = mongoose.model('Email', EmailSchema);
