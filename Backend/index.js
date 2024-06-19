const express = require("express");
const mongoose = require("mongoose");
const { songRouter, signUpRouter, editRouter, deleteRouter, postRouter, usersRouter } = require("./Routers");
require("dotenv").config();
const app = express();
const PORT = 3000;
const cors = require('cors');

// Connect to MongoDB
async function connectDatabase() {
    try {
        await mongoose.connect(process.env.mongoUrl);
        console.log('Connected to Database!!!');
    } catch (error) {
        console.error('Error connecting to Database:', error);
    }
}

app.use(express.json());

// Routes
app.get("/ping", (req, res) => {
    res.send("Hi");
});

app.use(cors({
    origin: 'https://funny-songs.vercel.app', // Replace with your client's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable set cookie from the frontend
    optionsSuccessStatus: 204
}));


// Connect to database route
app.get("/", (req, res) => {
    connectDatabase()
        .then(() => {
            console.log('Connected to Database!!!')
        });
    res.status(200).send("Connected to Database!!!")
});

// Routes using the routers
app.use("/Songs", songRouter);
app.use("/signup", signUpRouter);
app.use("/edit", editRouter);
app.use("/delete", deleteRouter);
app.use("/post", postRouter);
app.use("/users", usersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
