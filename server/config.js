exports.MONGODB = {
  url: 'mongodb://localhost:27017/examSystem',
  limit: 16
}

exports.SERVER = {
  path: '/api',
  port: 8000
}

exports.AUTH = {
  authAccout: 'ruaya123',
  name: 'shaojiajun',
  password: '123456',
  jwtSecret: 'my_admin'
}

exports.TREE = {
  paperCollection: {
    name: '网页制作',
    _papers: []
  },
  paper: {
    name: 'HTML语法测试',
    totalPoints: 100,
    time: 60,
    startTime: new Date(2020,6,20),
    examnum: 20,
    _paperCollection: '',
    _question: []
  },
  question: {
    name: 'html第二章',
    content: '如何让table的边框双线变单线?',
    selection: ['选项1','选项2','选项3','选项4'],
    difficutly: 2,
    type: 'single',
    score: 2,
    answer: '选项1',
    analysis: '变变变.',
    _paper: [],
    _paperCollection: ''
  },
  exam: {
    name: 'HTML5测试',
    question_name: 'html第二章',
    totalPoints: 2,
    time:  60,
    startTime: Date.now(),
    examNumber: 20,
    create_author: '王强',
    _question: []
  }
}