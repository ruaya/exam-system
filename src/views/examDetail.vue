<template>
  <div class="exam-detail">
    <Panel style="height:100%">
      <template slot="header">
        <div class="f-row">
          <div class="f-full" style="line-height:30px">{{ examForm.name }}</div>
          <div style="margin-right: 30px">
            题数: {{ examForm._questions.length }}
            总分: {{ examForm.totalPoints }}
          </div>
        </div>
      </template>
      <div class="content">
        <div>
          <ButtonGroup selectionMode="single">
            <LinkButton :toggle="true" :selected="true" @click="changeQuestionType('')">全部</LinkButton>
            <LinkButton :toggle="true" @click="changeQuestionType('single')">单选题</LinkButton>
            <LinkButton :toggle="true" @click="changeQuestionType('multiple')">多选题</LinkButton>
            <LinkButton :toggle="true" @click="changeQuestionType('judgement')">判断题</LinkButton>
            <LinkButton :toggle="true" @click="changeQuestionType('brief')">简答题</LinkButton>
            <LinkButton btnCls="c6" style="width:120px" @click="leadQuestion">导入题目</LinkButton>
          </ButtonGroup>
        </div>
        <DataList
          style="width:100%;"
          :data="questionsData"
          selectionMode="single">
          <template slot-scope="scope">
            <div class="question f-row">
              <div class="detail">
                <div class="detail-header">
                  <span style="margin-left:10px">
                    {{ sequenceNumber(scope.row._id) }} 
                    {{ scope.row.content }}
                  </span>
                  <div class="operation">
                    <span>{{ scope.row.score }}分  </span>
                    <span>{{ scope.row.difficutly }}级  </span>
                    <LinkButton :toggle="true" >修改</LinkButton>
                    <LinkButton :toggle="true" >删除</LinkButton>
                    <LinkButton :toggle="true">↑</LinkButton>
                    <LinkButton :toggle="true">↓</LinkButton>
                  </div>
                </div>
                <selection 
                  :mode="scope.row.type"
                  :selectionData="scope.row.selection"
                  :answer="scope.row.answer"
                  :editabled="false">
                </selection>
                <div class="analysis"><h5>解析:</h5> {{scope.row.analysis}}</div>
              </div>
            </div>
          </template>
        </DataList>
        <div class="footer">
          <LinkButton iconCls="icon-add" @click="putExam">保存</LinkButton>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import api from '../api'
import { success, error } from '../utils/message'
import selection from '../components/selection'
export default {
  name: "ExamDetail",
  data: function() {
    return {
      selection: null,
      questionsData: [],
      examForm: {
        totalPoints: 0
      }
    }
  },
  watch: {
    'route'() {
      this.getExam()
    }
  },
  created() {
    this.getExam()
  },
  methods: {
    leadQuestion() {
      this.$router.push({
        path: `/exam/${this.examForm._id}`,
        query: { name: this.examForm.question_name, exam_name: this.examForm.name }
      })
    },
    sequenceNumber(question_id) {
      const index = this.questionsData.findIndex(item => item._id === question_id)
      return `${index + 1}.`
    },
    async putExam() {
      let params = Object.assign(this.examForm, {
        _questions: this.questionsData
      })
      const res = await api.putExam(params)
      if (res && res.code === 1) {
        success(this, '修改成功')
      } else error(this, res.message)
    },
    changeQuestionType(type) {
      if (type) {
        this.questionsData = this.examForm._questions.filter(question => question.type === type)
      } else this.questionsData = this.examForm._questions
    },
    async getExam() {
      const res = await api.getExamById({ _id: this.$route.params.id })
      if (res && res.code === 1) {
        this.examForm = res.data.list
        this.questionsData = res.data.list._questions
        console.log(res.data)
      }
    },
    deleteQuestion(row) {
      this.$messager.confirm({
        title: 'delete',
        msg: '删除题目吗？',
        result: (r) => {
          if (r) {
            const index = this.questionsData.findIndex(question => question._id === row._id)
            index && this.questionsData.splice(index, 1)
          }
        }
      })
    },
    editQUestion(row) {
      this.$router.push(`/question/${row._id}`)
    },
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
    sortQuestion(row, predicate) {
      const index = this.questionsData.findIndex(question => question._id === row._id)
      if (predicate === 'up') {
        this.swapArray(this.questionsData, index - 1, index)
      } else if (predicate === 'down') {
        this.swapArray(this.questionsData, index, index + 1)
      }
    }
  },
  components: { selection }
};
</script>

<style lang="scss" scoped>
.question {
  border: 1px solid #000;
  .detail {
    width: 100%;
  }
  .detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .analysis {
    margin: 10px;
    h5 {
      font-size: 16px;
      font-weight: bold;
      margin: 5px;
    }
  }
}
</style>