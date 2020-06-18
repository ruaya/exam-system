const mongoose = require("../db").mongoose;

const qusetionSchema = new mongoose.Schema({
  name: String, // 知识点
  content: String, // 内容
  selection: [String], // 选项
  difficutly: Number,
  type: {
    type: String,
    enum: [
      "single", // 单选
      "multiple", // 多选
      "brief", // 简答
      "judgement" // 判断
    ]
  },
  score: Number, // 分值
  answer: String, // 答案
  analysis: String, // 试题解析
  _papers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paper" }], //所属试卷
  _paperCollection: { type: mongoose.Schema.Types.ObjectId, ref: 'PaperCollection'} // 试卷集
});

const Question = mongoose.model("Question", qusetionSchema);

module.exports = Question;
