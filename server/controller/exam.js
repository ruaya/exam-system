const App = require('./App')
// const Question = require('../model/Question')
const Exam = require('../model/Exam')

class ExamController extends App {
  async getExam(ctx) {
    const { current_page = 1, page_size = 20, keyword = '' } = ctx.query

    let optionns = keyword ? { name: new RegExp(keyword) } : {}
    const res = await Exam.find(optionns)
      .populate({
        path: '_questions',
        optionns: { skip: (current_page - 1) * page_size, limit: page_size }
      })
    
    if (res) {
      super.result(ctx, {
        code: 1,
        message: 'get exam success!',
        data: {
          count: res._questions || 0,
          list: res
        }
      })
    } else super.error(ctx, 'get exam fail')

  }
  // 获得考试及题目
  async getExamById(ctx) {
    const _id = ctx.params.id
    const { current_page = 1, page_size = 20 } = ctx.query
    if (!_id) super.error(ctx, 'check _id of exam vaild')

    const res = await Exam.findById(_id)
      .populate({
        path: '_questions',
        optionns: { skip: (current_page - 1) * page_size, limit: page_size }
      })
      .exec()
    
    if (res) {
      super.result(ctx, {
        code: 1,
        message: 'get exam by _id success!',
        data: {
          count: res._questions.length,
          list: res
        }
      })
    } else super.error(ctx, 'get exam by _id fail')
  }

  async postExam(ctx) {
    const examParams = ctx.request.body
    const res = await new Exam(examParams).save()
    if (res) super.result(ctx, {
      code: 1,
      message: 'post exam success!',
      data: res
    })
    else super.error(ctx, 'post exam fail')
  }
  
  async deleteExam(ctx) {
    const _id = ctx.params.id
    const res = await Exam.findByIdAndRemove(_id)
    if (res) super.success(ctx, 'delete exam success')
    else super.error(ctx, 'delete exam fail')
  }

  // 修改考试信息，导入题目
  async putExam(ctx) {
    const _id = ctx.params.id
    const examParams = ctx.request.body
    delete examParams._id
    const res = await Exam.findByIdAndUpdate(_id, examParams)
    if (res) super.success(ctx, 'put exam success')
    else super.error(ctx, 'put exam fail')
  }

}

module.exports = new ExamController