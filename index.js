const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Define MongoDB schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
});

// Define MongoDB model
const User = mongoose.model('User', userSchema);
// Export the model when defined in a separate file
// module.exports = User;

// Create a new user
app.post('/users', async (req, res) => {
  try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).send(users);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send({ message: 'User not found' });
      res.status(200).send(user);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!user) return res.status(404).send({ message: 'User not found' });
      res.status(200).send(user);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send({ message: 'User not found' });
      res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).send(error);
  }
});

// Connect to MongoDB
const connectionString = 'mongodb://localhost:27017/mongo-express';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});