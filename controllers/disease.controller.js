const mongoose = require('mongoose');
require("../models/disease.model");
const asyncWrapper = require("../middlewares/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const predict = asyncWrapper(async (req, res, next) => {
  const plant = req.params.plant;
  const language = req.params.language
  let DiseaseModel;

  try {
    if (language.toLowerCase() === 'arabic') {
      DiseaseModel = mongoose.model(`${plant}`);
    } else if (language.toLowerCase() === 'english') {
      DiseaseModel = mongoose.model(`EN${plant}`);
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
    const disease = await DiseaseModel.findOne({disease: response.data.prediction}, {__v: false, _id: false});
    if (!disease) {
      if (language.toLowerCase() === 'arabic') {
        return res.json({status: httpStatusText.SUCCESS, data: "النبات غير مصاب بأي أمراض. حافظ على العناية الجيدة به لضمان استمرار صحته ونموه السليم."});
      } else if (language.toLowerCase() === 'english') {
        return res.json({status: httpStatusText.SUCCESS, data: "The plant is not infected with any diseases. Maintain good care of it to ensure its continued health and proper growth."});
      }
    }
    return res.json({status: httpStatusText.SUCCESS, data: {disease}});
  })
  .catch(error => {
    console.error(error);
  })
});

module.exports = {
  predict
};