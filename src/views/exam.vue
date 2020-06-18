<template>
  <div class="exam-page">
    <Panel :collapsible="true" style="height:100%">
      <template slot="header">
				<div class="f-row">
					<div class="f-full" style="line-height:30px">{{ exam.name }}</div>
					<div style="margin-right: 30px">题数: {{ checkedQuestionId.length }}总分: {{ exam.totalPoints }}</div>
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
          </ButtonGroup>
        </div>
        <DataGrid style="height:250px"
          :data="questionDataClone"
          :pagination="true"
          :pageSize="pagination.page_size"
          :total="pagination.total"
          pagePosition="bottom">
          <GridColumn width="5%">
            <template slot="header">
              <div class="item">
                <input type="checkbox" v-model="checkedAll">
              </div>
            </template>
            <template slot="body" slot-scope="scope">
              <CheckBox :value="scope.row._id" :multiple="true" v-model="checkedQuestionId"></CheckBox>
            </template>
          </GridColumn>
          <GridColumn field="name" title="知识点" ></GridColumn>
          <GridColumn field="content" title="内容"></GridColumn>
          <GridColumn title="难度" width="10%">
            <template slot="body" slot-scope="scope">
              <div class="ellipsis">{{ scope.row.difficutly + '级' }}</div>
            </template>
          </GridColumn>
          <GridColumn title="类型" width="10%">
            <template slot="body" slot-scope="scope">
              <div>{{ formalType(scope.row.type) }}</div>
            </template>
          </GridColumn>
        </DataGrid>
      </div>
      <template slot="footer">
				<div style="padding:5px">
					<LinkButton iconCls="icon-add" @click="putExam">导入</LinkButton>
				</div>
			</template>
    </Panel>
  </div>
</template>

<script>
import { success, error } from '../utils/message'
import api from '../api'
export default {
  name: 'exam',
  data() {
    return {
      exam: {
        _id: '',
        name: '',
        totalPoints: 0,
      },
      pagination: {
        total: 0,
        page_size: 20
      },
      questionData: [],
      questionDataClone: [],
      checkedAll: false,
      checkedQuestionId: []
    }
  },
  computed: {
    authorName() {
      return this.$store.state.user.name
    }
  },
  created() {
    this.exam._id = this.$route.params.id
    this.exam.name = this.$route.query.exam_name
    this.getQuestion()
  },
  watch: {
    checkedAll(newVal) {
      if (newVal) {
        this.questionDataClone.forEach(question => {
          this.checkedQuestionId.push(question._id)
        })
      } else {
        this.checkedQuestionId = []
      }
    },
  },
  methods: {
    formalType(type) {
      let formalType
      switch (type) {
        case 'single':
          formalType = '单选题'
          break;
        case 'multiple':
          formalType = '多选题'
          break;
        case 'judgement':
          formalType = '判断题'
          break;
        default:
          formalType = '主观题'
          break;
      }
      return formalType
    },
    async getQuestion() {
      const res = await api.searchQuestion({ name: this.$route.query.name })
      if (res && res.code === 1) {
        /* this.questionData = res.data.list.map(question => {
          return {
            checked: false,
            ...question
          }
        }) */
        this.questionData = res.data.list
        this.questionDataClone = res.data.list
        this.pagination.total = this.questionDataClone.length
      }
    },
    changeQuestionType(type) {
      if (type) {
        this.questionDataClone = this.questionData.filter(question => question.type === type)
      } else this.questionDataClone = this.questionData
      this.pagination.total = this.questionDataClone.length
    },
    putExam() {
      this.$messager.prompt({
        title: "导入",
        msg: "设置每题的分值",
        result: async (r) => {
          if (r) {
            this.exam.totalPoints = Number(this.exam.totalPoints) + Number(r) * Number(this.checkedQuestionId.length)
            const res = await api.putExam({
              ...this.exam,
              create_author: this.authorName,
              _questions: this.checkedQuestionId
            })
            console.log(this.exam)
            if (res && res.code === 1) success(this, '导入题目成功')
            else error(this, res.message)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>