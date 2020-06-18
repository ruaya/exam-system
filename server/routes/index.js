const Router = require("koa-router");
const config = require("../config");
const controller = require("../controller");

const router = new Router({
  prefix: config.SERVER.path
});

router.get("/", (ctx) => {
  ctx.response.body = "welcome admin";
})
.post('/auth', controller.auth.login) // 登录
.get('/auth', controller.auth.getAuth) // 获取信息
.put('/auth', controller.auth.editAuth) // 修改信息

.get('/collection', controller.paperCollection.getAllPaperCollections) // 所有试卷集 和 试卷
.get('/collection/:id', controller.paperCollection.getOnePaperCollection) // 单个试卷集 和 试卷
.post('/collection', controller.paperCollection.postPaperCollections) // 添加试卷集
.delete('/collection/:id', controller.paperCollection.deletePaperCollections) // 删除试卷集
.patch('/collection/:id', controller.paperCollection.patchPaperCollections) // 修改试卷集信息

.get('/paper', controller.paper.getPapers) // 获取所有试卷 和题目 ，或搜索
.get('/paper/:id', controller.paper.getPaperByCollection) // 获得试卷集和试卷
.post('/paper', controller.paper.postPaper) // 添加试卷
.delete('/paper/:id', controller.paper.deletePaper) // 删除试卷
.put('/paper/:id', controller.paper.putPaper) // 修改试卷

.get('/questionbyid/:id', controller.question.getQuestionById) // 单独的题目
.get('/searchQuestion', controller.question.searchQuestion) // 搜索题目
.get('/question/:id', controller.question.getQuestionByPaper) // 通过试卷_id 获得题目
.post('/question', controller.question.postQuestion) // 添加题目
.delete('/question/:id', controller.question.deleteQuestion) // 删除题目
.put('/question/:id', controller.question.putQuestion) //修改题目

.get('/exam', controller.exam.getExam)
.get('/exam/:id', controller.exam.getExamById)
.post('/exam', controller.exam.postExam)
.delete('/exam/:id', controller.exam.deleteExam)
.put('/exam/:id', controller.exam.putExam)
module.exports = router;
