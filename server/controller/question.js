const App = require('./App')
const Paper = require('../model/Paper')
const Question = require('../model/Question')

class QuestionController extends App {
  // 搜索题目
  async searchQuestion(ctx) {
    let { keyword = '', name = '' } = ctx.query
    let res, options = {}
  
    if (keyword) {
      let keywordExp = new RegExp(keyword, 'i')
      options = { content: keywordExp }
    }

    if (name) {
      options = { name }
    }
    
    res = await Question.find(options)
    if (res) {
      super.result(ctx, {
        code: 1,
        message: 'search question success',
        data: {
          count: res.length,
          list: res
        }
      })
    } else super.error(ctx, 'search question error')
  }

  async getQuestionById(ctx) {
    const _id = ctx.params.id
    const res = await Question.findById(_id)
      .populate({ path: '_paper'})
      .populate({ path: '_paperCollection'})
      .exec()
    
    if (res) {
      super.result(ctx,{
        code: 1,
        message: 'get question by id success',
        data: res
      })
    } else super.error(ctx, 'get question by id fail')
  }

  // 显示 试卷 和 题目
  async getQuestionByPaper(ctx) {
    const _id = ctx.params.id // 试卷的_id
    const { current_page = 1, page_size = 20 } = ctx.query
    if (!_id) super.error(ctx, 'check _id of paper is right!')

    const res = await Paper.findById(_id)
      .populate({
        path: '_questions',
        options: { skip: (current_page - 1) * page_size, limit: page_size }
      })
      .exec()
    if (res) {
      super.result(ctx, {
        code: 1,
        message: 'get question success!',
        data: {
          count: res._questions.length,
          list: res
        }
      })
    } else super.error(ctx, 'get question error!')
  }

  async postQuestion(ctx) {
    const questionParams = ctx.request.body

    // let paper = await Paper.findById(questionParams._papers[0])
    const question = await new Question(questionParams).save()

    const res = await Paper.updateOne(
      { _id: questionParams._papers }, 
      { $push: { _questions: question._id }}
    )

    /* paper._questions.push(question._id)
    const res = await paper.save() */
    if (res) super.success(ctx, 'add question success')
    else super.error(ctx, 'add question error')
  }

  async deleteQuestion(ctx) {
    const _id = ctx.params.id // 题目_id
    if (!_id) super.error(ctx, 'check _id of question is vailtor')
    
    const delete1 = Question.findByIdAndRemove(_id)

    const delete2 = Paper.updateMany(
      { _questions: { $in: _id }}, 
      { $pull: { _questions: { $in: _id }}},
      { multi: true }
    )

    await Promise.all([delete1, delete2])
      .finally(() => {
        super.success(ctx, 'delete question success')
      })
      .catch((err) => {
        super.error(ctx, `delete question err: ${err}`)
      })
  }

  async putQuestion(ctx) {
    const _id = ctx.params.id
    const questionParams = ctx.request.body
    delete questionParams._papers
    delete questionParams._paperCollection
    if (!_id) super.error(ctx, 'check _id of question is vailtor')

    const res = await Question.findByIdAndUpdate(_id, questionParams)
    if (res) super.success(ctx, 'edit question success')
    else super.error(ctx, 'edit question eror')
  }
}

module.exports = new QuestionController()