const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT, 
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
  (err) => {
      if(err) return console.error(err);
      console.log("Connected to the database");
  });

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/test', (req,res)=>{
    res.send("Test");
});

const server = app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

process.on("unhandledRejection", (err, promise) =>{
    console.log("Error: " + err);
    server.close(() => process.exit(1));   
})

// Set up routes
app.use('/', express.static(path.join(__dirname,'../Frontend/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'build', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  })
});


app.use("/api/authentication" ,require('./Routes/Authentication'));
app.use("/api/requests" ,require('./Routes/Requests'));