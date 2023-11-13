const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  reportType: {
    type: String,
    required: true,
  },
  originOfReport: {
    type: String,
    required: true,
  },
  nameOfSender: {
    type: String,
    required: true,
  },
  nameOfRecipient: {
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
  date: {
    type: String,
    require: true,
  },
  dateTk: {
    type: Date,
    default: Date.now,
  },
  sendTime: {
    type: String,
    required: true,
  },
  receiveTime: {
    type: String,
    required: true,
  },
  doneTime: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  evaluate: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model('Report', ReportSchema);
