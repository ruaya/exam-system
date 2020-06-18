const App = require('./App')
const PaperCollection = require('../model/PaperCollection')
const Paper = require('../model/Paper')
const Question = require('../model/Question')

class PaperController extends App {
  // 获取试卷 和 题目
  async getPapers(ctx) {
    const { current_page = 1, page_size = 100, keyword = '' } = ctx.query

    let keywordExp
    keyword && (keywordExp = new RegExp(keyword, 'i'))

    let options = keywordExp ? { name: keywordExp } : {}

    const res = await Paper.find(options)
      .populate({ path: '_questions'})
      .populate('_paperCollection')
      .skip((current_page - 1) * page_size)
      .limit(page_size)
    if (res) {
      super.result(ctx, {
        code: 1,
        message: 'get papers success!',
        data: {
          count: res.length,
          list: res
        }
      })
    } else super.error(ctx, 'get papers fail, wait moment..')
  }

  // 显示试卷集和试卷
  async getPaperByCollection(ctx) {
    const _id = ctx.params.id
    const { current_page = 1, page_size = 100 } = ctx.query

    const res = await PaperCollection.findById(_id)
      .populate({
        path: '_papers',
        options: { skip: (current_page - 1) * page_size, limit: page_size}
      })
    if (res) {
      super.result(ctx, {
        code: 1,
        message: 'get paper success!',
        data: res
      })
    }
  }

  async postPaper(ctx) {
    let paperParams = ctx.request.body

    // let paperCollection = await PaperCollection.findById(paperParams._paperCollection)
    const paper = await new Paper(paperParams).save()
    
    const res = await PaperCollection.updateOne(
      { _id: paperParams._paperCollection },
      { $push: { _papers: paper._id }}
    )
    /* paperCollection._papers.push(paper._id)
    const res = await paperCollection.save() */

    if (res) super.success(ctx, 'create paper success')
    else super.error(ctx, 'create paper error!')
  }

  async deletePaper(ctx) {
    const _id = ctx.params.id
    if (!_id) super.error(ctx, 'check _id of paper')
    
    const deletePC = PaperCollection.update(
      {},
      { $pull: { _papers: { $in: _id }}}
    )
    const deleteP = Paper.findByIdAndRemove(_id)
    const deleteQ = Question.updateMany(
      { _papers: { $in: _id }},
      { $pull: { _papers: { $in: _id }}}
    )

    await Promise.all([deletePC, deleteP, deleteQ])
      .finally(() => {
        super.success(ctx, 'delete paper success!')
      })
      .catch((err) => {
        super.error(ctx, 'delete paper err: ' + err)
      })
  }

  async putPaper(ctx) {
    const _id = ctx.params.id
    const paperParams = ctx.request.body
    delete paperParams._paperCollection
    delete paperParams._questions

    const res = await Paper.findByIdAndUpdate(_id, paperParams)
    if (res) super.success(ctx, 'edit paper success')
    else super.error(ctx, 'edit paper error')
  }
}

module.exports = new PaperController()