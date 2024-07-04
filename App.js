require('dotenv').config();

const express = require('express');

const path = require('path');

const cors = require('cors');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('mongodb connection established');
});

app.use(cors());

app.use(express.json());


const diseaseRouter = require('./routers/disease.route');
app.use('/api/diseases', diseaseRouter);

const growthRouter = require('./routers/growth.route');
app.use('/api/growth', growthRouter);



const httpStatusText = require('./utils/httpStatusText');

// global middleware for not found routes
app.all('*', (req, res, next) => {
  return res.status(404).json({status: httpStatusText.ERROR, message: "this resource is not available"});
});

// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
