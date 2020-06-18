const mongoose = require("../db").mongoose;

const examSchema = new mongoose.Schema({
  name: String, // 考试名称
  question_name: String, // 知识点
  totalPoints: Number, // 总分
  time: Number, // 考试时间
  startTime: Date, // 开始时间
  examNumer: Number, // 考试人数
  create_time: { type: Date, default: Date.now }, // 创建时间
  create_author: String, // 创建者名
  _questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
})

const Exam = mongoose.model('Exam', examSchema)

module.exports = Exam