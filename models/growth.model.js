const mongoose = require('mongoose');

const growthSchema = new mongoose.Schema({
  week: {
    type: String,
    required: true
  },
  stage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  actions: {
    type: Array,
    required: true
  }
});

const ZucchiniGrowth = mongoose.model("ZucchiniGrowth", growthSchema);
const BellPepperGrowth = mongoose.model("BellPepperGrowth", growthSchema);
const CucumberGrowth = mongoose.model("CucumberGrowth", growthSchema);

const ENZucchiniGrowth = mongoose.model("ENZucchiniGrowth", growthSchema);
const EnBellPepperGrowth = mongoose.model("EnBellPepperGrowth", growthSchema);
const EnCucumberGrowth = mongoose.model("EnCucumberGrowth", growthSchema);

module.exports = {
  ZucchiniGrowth,
  BellPepperGrowth,
  CucumberGrowth,
  ENZucchiniGrowth,
  EnBellPepperGrowth,
  EnCucumberGrowth
};
