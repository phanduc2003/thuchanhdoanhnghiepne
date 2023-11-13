const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  reportType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: true,
  },
  image: [String], 
  evaluate: {
    type: Number,
    required: true,
  },
  evaluate: {
    type: Number,
    required: true,
  },
  timeDone: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true
  },
});


module.exports = mongoose.model('Report', ReportSchema);
