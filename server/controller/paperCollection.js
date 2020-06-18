const App = require('./App')
const PaperCollection = require('../model/PaperCollection')
const Paper = require('../model/Paper')

class PaperCollectionController extends App {
  async getAllPaperCollections(ctx) {
    const res = await PaperCollection.find().populate({ path: '_papers' }).exec()
    if (res) {
      super.result(ctx, {
        code: 1,
        message: 'get all paperCollection success',
        data: res
      })
    }
  }

  async getOnePaperCollection(ctx) {
    const _id = ctx.params.id
    if (!_id) super.error(ctx, '_id is not verified!')
    const res = await PaperCollection.findById(_id).populate({ path: '_papers' }).exec()
    if (res) {
      super.result(ctx, {
        code: 1,
        message: 'get one papercollection success',
        data: res
      })
    }
  }

  async postPaperCollections(ctx) {
    const paperCollection = ctx.request.body
    const res = await new PaperCollection(paperCollection).save().catch(err => console.error(`server error: ${err}`))
    if (res) super.success(ctx, 'add PaperCollections success')
    else super.error(ctx, 'add PaperCollections fail')
  }

  async deletePaperCollections(ctx) {
    const _id = ctx.params.id
    const res1 = await PaperCollection.findByIdAndRemove(_id)
    if (res1) {
      const res2 = await Paper.remove({ _paperCollection: { $in: _id }})
      if (res2) super.success(ctx, 'delete PaperCollections success')
      else super.error(ctx, 'delete PaperCollections fail')
    }
  }

  async patchPaperCollections(ctx) {
    const _id = ctx.params.id
    const { name } = ctx.request.body
    const res = await PaperCollection.findByIdAndUpdate(_id, { name })
    if (res) super.success(ctx, 'edit PaperCollections success')
    else super.error(ctx, 'edit PaperCollections fail')
  }
}

module.exports = new PaperCollectionController()