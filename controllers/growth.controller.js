const mongoose = require('mongoose');
require("../models/growth.model")
const asyncWrapper = require("../middlewares/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const predict = asyncWrapper(async (req, res, next) => {
  const plant = req.params.plant;
  const language = req.params.language;
  let GrowthModel;
  
  try {
    if (language.toLowerCase() === 'arabic') {
      GrowthModel = mongoose.model(`${plant}`);
    } else if (language.toLowerCase() === 'english') {
      GrowthModel = mongoose.model(`EN${plant}`);
    }
  } catch (error) {
    error = appError.create(`Model for ${plant} not found`, 404, httpStatusText.FAIL);
    return next(error);
  }
  
  const imagePath = req.file.path;
  const image = fs.createReadStream(imagePath);
  const form = new FormData();
  form.append('image', image);
  axios.post(`http://127.0.0.1:5000/predict/${plant}`, form, {
    headers: form.getHeaders()
  })
  .then(async response => {
    fs.unlinkSync(imagePath);
    const week = await GrowthModel.findOne({week: response.data.prediction}, {__v: false, _id: false});
    if (!week) {
      if (language.toLowerCase() === 'arabic') {
        return res.json({status: httpStatusText.SUCCESS, data: "آسف، لا يمكن التعرف على الأسبوع"});
      } else if (language.toLowerCase() === 'english') {
        return res.json({status: httpStatusText.SUCCESS, data: "sorry, the week can not be recognized"});
      }
    }
    return res.json({status: httpStatusText.SUCCESS, data: {week}});
  })
  .catch(error => {
    console.error(error);
  })
});

module.exports = {
  predict
}