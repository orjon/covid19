const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connectDB
connectDB();

// init middleware (body parser to get data from req.body)
app.use(express.json({ extended: false }));

//define routes:

app.use('/covidapi/user', require('./routes/api/user'));
app.use('/covidapi/auth', require('./routes/api/auth'));
app.use('/covidapi/stats', require('./routes/api/stats'));
app.use('/covidapi/countries', require('./routes/api/countries'));

// //Serve static assests in production
// if (process.env.NODE_ENV === 'production') {
//   //set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

//Serve static assests
// app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
