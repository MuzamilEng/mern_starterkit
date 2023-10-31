const User = require('../models/auth');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create and save the new user
      const newUser = new User({
        username,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user in the database by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports = {
    signUp,
    login
}