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
  image: {
    type: String,
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
    type: String,
    required: true,
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
