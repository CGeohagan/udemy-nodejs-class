// create an express app that serves two html files for "/" and "/users"
// add static js or css to projects

const express = require('express');
const path = require('path');

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Use is generic. Get will be exact route
app.use(userRoutes);
app.use(indexRoutes);

app.listen(3000);