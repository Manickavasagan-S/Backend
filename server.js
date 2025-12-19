const app = require('./index');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({
  origin: "https://vercel.com/manickavasagans-projects",
  credentials: true
}));

dotenv.config({ path: require('path').join(__dirname, 'config.env') });

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB connected to TaskManagementSystem');
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message);
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});