const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  disease: {
    type: String,
    required: true
  },
  causalAgent: {
    type: String,
    required: true
  },
  symptoms: {
    type: Array,
    required: true
  },
  sourceOfInfection: {
    type: String,
    required: true
  },
  favorableConditions: {
    type: String,
    required: true
  },
  treatmentAndControlMethods: {
    fungicides: {
      type: Array,
      required: true
    },
    agriculturalManagement: {
      type: Array,
      required: true
    }
  }
});

const TomatoDisease = mongoose.model('TomatoDisease', diseaseSchema);
const AppleDisease = mongoose.model('AppleDisease', diseaseSchema);
const CucumberDisease = mongoose.model('CucumberDisease', diseaseSchema);
const ZucchiniDisease = mongoose.model('ZucchiniDisease', diseaseSchema);
const EggplantDisease = mongoose.model('EggplantDisease', diseaseSchema);

const ENTomatoDisease = mongoose.model('ENTomatoDisease', diseaseSchema);
const ENAppleDisease = mongoose.model('ENAppleDisease', diseaseSchema);
const ENCucumberDisease = mongoose.model('ENCucumberDisease', diseaseSchema);
const ENZucchiniDisease = mongoose.model('ENZucchiniDisease', diseaseSchema);
const ENEggplantDisease = mongoose.model('ENEggplantDisease', diseaseSchema);

module.exports = {
  TomatoDisease,
  AppleDisease,
  CucumberDisease,
  ZucchiniDisease,
  EggplantDisease,
  ENTomatoDisease,
  ENAppleDisease,
  ENCucumberDisease,
  ENZucchiniDisease,
  ENEggplantDisease
};
