const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const resultsumSchema = new mongoose.Schema(
  {
    compte: {
      type: String,
      required: true,
      unique: true
    },
    intitule: {
      type: String,
      required: true
    },
    ordre: {
      type: Number
    },
    index: {
      type: Number
    },
    uuid: {
      type: String,
      default: uuid,
      unique: true
    }
  },
  { timestamps: true }
);

const resultsumModel = mongoose.model('Resultsum', resultsumSchema);

module.exports = resultsumModel;
