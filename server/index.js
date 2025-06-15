const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const UserModel = require('./models/User');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/login', (req, res) => 
    {
        const { email, password } = req.body;
        UserModel.findOne({ email: email })
            .then(user => {
                if (user) 
                {
                    if (user.password === password) 
                    {
                        res.json({ status: "Success", user });
                    } else 
                    {
                        res.json({ status: "Error", message: "The password is incorrect" });
                    }
                } 
                else 
                {
                    res.json({ status: "Error", message: "User not found" });
                }
            })
    });

app.post('/register', (req, res) => 
    {
        UserModel.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
    });

app.listen(process.env.PORT, () => 
    {
        console.log(`Server running on port ${process.env.PORT}`);
    });
