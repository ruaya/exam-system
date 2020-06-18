const mongoose = require("../db").mongoose;

const paperSchema = new mongoose.Schema({
  name: String, // 试卷名
  totalPoints: Number, // 总分
  time: Number, // 考试时间
  startTime: Date, // 开始时间
  examNumer: Number, // 考试人数
  _paperCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaperCollection"
  }, // 所属试卷集
  _questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});

const Paper = mongoose.model("Paper", paperSchema);

module.exports = Paper;
