const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register
exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        if(!fullName || !email || !password){
            return res.status(400).json({ message: 'All field required'});
        }
       
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login
// Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.fullName, email: user.email }, 
            process.env.JWT_SECRET || 'yourSecretKey',
            { expiresIn: '1h' }
        );

        // Send response with token and user data
        res.status(200).json({ message: 'Login successful', token, name: user.fullName });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// logout 
exports.logout = async (req,res) =>{
   try {
     res.status(200).json({message:"User logout successfully"})
   } catch (error) {
    res.status(500).json({message:"Server",error:error.message})
   }
}