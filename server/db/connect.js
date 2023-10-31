const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(process.env.URI);
    const conn = await mongoose.connect(process.env.URI,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectDB;