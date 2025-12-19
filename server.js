const app = require('./index');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config({ path: require('path').join(__dirname, 'config.env') });

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0
  })
  .then(() => {
    console.log('MongoDB connected to TaskManagementSystem');
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));