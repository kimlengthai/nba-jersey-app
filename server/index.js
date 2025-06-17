const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/login', async (req, res) => 
    {
        const { email, password } = req.body;
    
        try
        {
            const user = await UserModel.findOne({ email });

            if (!user) 
            {
                return res.json({ status: "Error", message: "User not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
            {
                return res.json({ status: "Error", message: "Incorect password" });
            }

            res.json({ status: "Success", user });
        }
        catch (err)
        {
            res.status(500).json({ status: "Error", message: "Server error", error: err.message });
        }
    });

app.post('/register', async (req, res) => 
    {
        try 
        {
            const { name, email, password } = req.body;
            const hash = await bcrypt.hash(password, 10);
            const user = await UserModel.create({ name, email, password: hash});
            res.json(user);
        } catch (err)
        {
            res.status(400).json(error);
        }
    });

app.listen(process.env.PORT, () => 
    {
        console.log(`Server running on port ${process.env.PORT}`);
    });
