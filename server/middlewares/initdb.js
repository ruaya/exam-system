const Auth = require('../model/Auth')
const Paper = require('../model/Paper')
const PaperCollection = require('../model/PaperCollection')
const Question = require('../model/Question')
const Exam = require('../model/Exam')
const crypto = require('crypto')
const config = require('../config')


const md5Decode = pwd => {
  return crypto
    .createHash('md5')
    .update(pwd)
    .digest('hex')
}

module.exports = async (ctx, next) => {
  // 初始化管理员
  const authAccount = config.AUTH.authAccout
  const name = config.AUTH.name
  const password = md5Decode(config.AUTH.password)
  let auth = await Auth.find().exec()
  if (auth.length === 0) {
    let auth = new Auth({ authAccount, name, password })
    auth.save().catch(err => ctx.throw(500, 'Server create auth fail, error: ' + err))
    console.log('auth success')
  }
  // 初始化数据
  const exist1 = PaperCollection.find().exec()
  const exist2 = Paper.find().exec()
  const exist3 = Question.find().exec()
  const exist4 = Exam.find().exec()

  const res = await Promise.all([exist1, exist2, exist3, exist4])

  if (res.every(item => item.length === 0)) {
    const paperCollection = new PaperCollection(config.TREE.paperCollection)
    
    const paperParams = config.TREE.paper
    paperParams._paperCollection = paperCollection._id
    const paper = new Paper(paperParams)
    
    const questionParams = config.TREE.question
    questionParams._paperCollection = paperCollection._id
    questionParams._papers = paper._id
    const question = new Question(questionParams)
    
    const examParams = config.TREE.exam
    examParams._question = question._id
    const exam = new Exam(examParams)

    paperCollection._papers.push(paper)
    paper._questions.push(question)
    
    await Promise.all([paperCollection.save(), paper.save(), question.save(), exam.save()])
      .finally(() => {
        console.log('测试数据生成成功!')
      })
      .catch(err => ctx.throw(500, `Server init data fail, error: ${err}`))
  }

  await next()
}