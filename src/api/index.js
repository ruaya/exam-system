import instence from './axios'

export default {
  /** 登录 */ 
  login(params) {
    return instence.post('/auth', params).then(res => res.data)
  },
  /** 管理员数据 */
  getAuth() {
    return instence.get('/auth').then(res => res.data)
  },
  putAuth(params) {
    return instence.put('/auth', params).then(res => res.data)
  },

  /** 获取所有试卷集和试卷 */
  getCollection() {
    return instence.get('/collection').then(res => res.data)
  },
  /** 获取单个试卷集 和 试卷 */
  getOneCollection(params) {
    return instence.get(`/collection/${params._id}`, params).then(res => res.data)
  },
  /**  添加试卷集 */
  postCollection(params) {
    return instence.post('/collection', params).then(res => res.data)
  },
  /**  删除试卷集 */
  deleteCollection(params) {
    return instence.delete(`/collection/${params}`).then(res => res.data)
  },
  /**  修改试卷集 */
  putCollection(params) {
    return instence.patch(`/collection/${params._id}`, params).then(res => res.data)
  },
  
  /**  获得试卷 和 题目，或搜索 */
  getPapers(params) {
    return instence.get('/paper', params).then(res => res.data)
  },
  /**  获得试卷集和试卷 */
  getPapersByCollection(params) {
    return instence.get(`/paper/${params._id}`, params).then(res => res.data)
  },
  /**  添加试卷 */
  postPaper(params) {
    return instence.post('/paper', params).then(res => res.data)
  },
  /**  删除试卷 */
  deletePaper(params) {
    return instence.delete(`/paper/${params}`).then(res => res.data)
  },
  /**  修改试卷 */
  putPaper(params) {
    return instence.put(`/paper/${params._id}`, params).then(res => res.data)
  },

  /* 获得要修改的题目信息 */
  getQuestionById(params) {
    return instence.get(`/questionbyid/${params}`).then(res => res.data)
  },
  /**  搜索问题 */
  searchQuestion(params = {}) {
    return instence.get(`/searchQuestion`, { params }).then(res => res.data)
  },
  /**  通过试卷_id获得题目 */
  getQuestion(params) {
    return instence.get(`/question/${params._id}`, params).then(res => res.data)
  },
  /**  添加题目 */
  postQuestion(params) {
    return instence.post('/question', params).then(res => res.data)
  },
  /**  删除题目 */
  deleteQuestion(params) {
    return instence.delete(`/question/${params}`).then(res => res.data)
  },
  /**  修改题目 */
  putQuestion(params) {
    return instence.put(`/question/${params._id}`, params).then(res => res.data)
  },

  /** 获得，搜索考试 */
  getExam(params) {
    return instence.get('/exam', { ...params }).then(res => res.data)
  },
  /** 获得考试id 及题目(分页) */
  getExamById(params) {
    return instence.get(`/exam/${params._id}`, { ...params }).then(res => res.data)
  },
  /** 添加考试 */
  postExam(params) {
    return instence.post('/exam', params).then(res => res.data)
  },
  /** 删除考试 */
  deleteExam(params) {
    return instence.delete(`/exam/${params}`).then(res => res.data)
  },
  /** 修改考试信息 */
  putExam(params) {
    return instence.put(`/exam/${params._id}`, params).then(res => res.data)
  }
}