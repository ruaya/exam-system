<template>
  <div class="manage-page">

    <Panel :bodyStyle="{padding:'5px'}">
      <template slot="header">
        <div class="f-row">
          <div class="f-full" style="line-height:30px">题库集</div>
          <LinkButton iconCls="icon-add" 
            @click="handlerType('paperCollection').postData()">添加题库集
          </LinkButton>
        </div>
      </template>
      <div class="content">
        <DataGrid style="height:250px" :data="paperCollectionData">
          <GridColumn field="name" title="名称"></GridColumn>
          <GridColumn title="题库">
            <template slot="body" slot-scope="scope">
              <span v-for="(paper, index) in scope.row._papers" :key="index">{{ paper.name }} / </span>
            </template>
          </GridColumn>
          <GridColumn title="操作" width="20%">
            <template slot="header">
              <div class="item">
                <div class="title">操作</div>
              </div>
            </template>
            <template slot="body" slot-scope="scope">
              <LinkButton iconCls="icon-cut" 
                @click="handlerType('paperCollection').putData()(scope.row)">修改
              </LinkButton>
              <LinkButton iconCls="icon-remove" 
                @click="handlerType('paperCollection').deleteData()(scope.row)">删除
              </LinkButton>
            </template>
          </GridColumn>
        </DataGrid>
      </div>
    </Panel>

    <Panel :bodyStyle="{padding:'5px'}">
      <template slot="header">
        <div class="f-row">
          <div class="f-full" style="line-height:30px">题库</div>
          <LinkButton iconCls="icon-add" 
            @click="handlerType('paper').postData()">添加题库
          </LinkButton>
        </div>
      </template>
      <div class="content">
        <DataGrid
          style="height:250px"
          :data="paperData.list"
          :pagination="true"
          :total="paperData.count"
          :pageSize="paper.pagination.page_size"
          pagePosition="bottom">
          <GridColumn field="name" title="名称"></GridColumn>
          <GridColumn title="属于">
            <template slot="body" slot-scope="scope">
              <span>{{ scope.row._paperCollection.name}}</span>
            </template>
          </GridColumn>
          <GridColumn title="操作" width="20%">
            <template slot="header">
              <div class="item">
                <div class="title">操作</div>
              </div>
            </template>
            <template slot="body" slot-scope="scope">
              <LinkButton iconCls="icon-cut" 
                @click="handlerType('paper').putData()(scope.row)">修改
              </LinkButton>
              <LinkButton iconCls="icon-remove" 
                @click="handlerType('paper').deleteData()(scope.row)">删除
              </LinkButton>
            </template>
          </GridColumn>
        </DataGrid>
      </div>
    </Panel>

    <Panel :bodyStyle="{padding:'5px'}">
      <template slot="header">
        <div class="f-row">
          <div class="f-full" style="line-height:30px">考试</div>
          <LinkButton iconCls="icon-add" 
            @click="handlerType('exam').postData()">添加考试
          </LinkButton>
        </div>
      </template>
      <div class="content">
        <DataGrid
          style="height:250px"
          :data="examData.list">
          <GridColumn field="name" title="考试名"></GridColumn>
          <GridColumn field="question_name" title="知识点"></GridColumn>
          <GridColumn field="totalPoints" title="总分"></GridColumn>
          <GridColumn title="出卷人/时间" width="20%">
            <template slot="body" slot-scope="scope">
              <span>{{ scope.row.create_author }}/</span>
              <span>{{ scope.row.create_time | formatDate('yyyy-MM-dd hh:mm:ss') }}</span>
            </template>
          </GridColumn>
          <GridColumn title="操作" width="20%">
            <template slot="header">
              <div class="item">
                <div class="title">操作</div>
              </div>
            </template>
            <template slot="body" slot-scope="scope">
              <LinkButton iconCls="icon-cut" 
                @click="handlerType('exam').putData()(scope.row)">修改
              </LinkButton>
              <LinkButton iconCls="icon-remove" 
                @click="handlerType('exam').deleteData()(scope.row)">删除
              </LinkButton>
            </template>
          </GridColumn>
        </DataGrid>
      </div>
    </Panel>

    <confirm :visible.sync="dialog.visible" :title="dialog.title" @confirmEvent="dialog.onConfirm">
      <div class="content" v-if="dialog.mode === 'putpaperCollection' || dialog.mode === 'postpaperCollection'">
        <div style="margin-bottom:20px">
          <Label for="name" align="left">题库集名</Label>
          <TextBox inputId="name" v-model="paperCollection.form.name"></TextBox>
        </div>
      </div>

      <div class="content" v-if="dialog.mode === 'putpaper' || dialog.mode === 'postpaper'">
        <div style="margin-bottom:20px">
          <Label for="name" align="left">题库名</Label>
          <TextBox inputId="name" v-model="paper.form.name"></TextBox>
        </div>
        <div style="margin-bottom:20px">
          <Label for="name" align="left">属于题库集</Label>
          <ComboBox v-model="paper.form._paperCollection" :data="paperCollectionNameData"></ComboBox>
        </div>
      </div>

      <div class="content" v-if="dialog.mode === 'putexam' || dialog.mode === 'postexam'">
        <div style="margin-bottom:20px">
          <Label for="name" align="left">考试名</Label>
          <TextBox inputId="name" v-model="exam.form.name"></TextBox>
        </div>
        <div style="margin-bottom:20px">
          <Label for="name" align="left">知识点</Label>
          <ComboBox v-model="exam.form.question_name" :data="questionNameData"></ComboBox>
        </div>
      </div>
    </confirm>
  </div>
</template>

<script>
import { uniq } from '../utils/tools'
import confirm from '../components/confirm'
import { success, error } from '../utils/message'
import api from "../api";
export default {
  name: "manage",
  data() {
    return {
      dialog: {
        title: '',
        onConfirm: '',
        mode: '',
        visible: false
      },
      // 表单
      paperCollection: {
        form: {
          name: ''
        }
      },
      paper: {
        form: {
          name: '',
          totalPoints: 0,
          time: 0,
          startTime: 0,
          examNumer: 0,
        },
        keyword: '',
        pagination: {
          current_page: 1,
          page_size: 100,
          total: 100
        }
      },
      exam: {
        form: {
          name: '',
          question_name: ''
        }
      },
      // 列表数据
      paperCollectionData: [],
      paperData: [],
      examData: [],
      // 组合框数据
      questionNameData: [],
      paperCollectionNameData: [],
      paperNameData: [],
      examNameData: []
    };
  },
  components: { confirm },
  created() {
    this.handlerType('paperCollection').getData()
    this.handlerType('paper').getData()
    this.handlerType('exam').getData()
    this.getAllQuestionName()
  },
  mounted() {
    
  },
  methods: {
    async getAllQuestionName() {
      const res = await api.searchQuestion()
      if (res && res.code === 1) {
        let list = res.data.list.map(question => {
          return {
            value: question.name,
            text: question.name
          }
        })
        this.questionNameData = uniq(list, 'value')
      } else error(this, res.message)
    },
    handlerType(type) {
      let getApi, deleteApi, postApi, putApi, title
      switch (type) {
        case 'paperCollection':
          title = '题库集'
          getApi = api.getCollection
          deleteApi = api.deleteCollection
          postApi = api.postCollection
          putApi = api.putCollection
          break;
        case 'paper':
          title = '题库'
          getApi = api.getPapers
          deleteApi = api.deletePaper
          postApi = api.postPaper
          putApi = api.putPaper
          break;
        case 'exam':
          title = '考试'
          getApi = api.getExam
          deleteApi = api.deleteExam
          postApi = api.postExam
          putApi = api.putExam
          break;
      }
      return {
        getData: () => this.getData(type, getApi),
        postData: () => this.postData(type, title, putApi, postApi),
        putData: () => this.putData(type, title, putApi, postApi),
        deleteData: () => this.deleteData(type, title, deleteApi, getApi)
      }
    },
    async getData(type, fn) {
      const res = await fn()
      if (res && res.code === 1) {
        this[`${type}Data`] = res.data
        
        type === 'exam' && (this.examData = res.data)

        let iteratee
        if (!res.data.list) {
          iteratee = res.data
        } else iteratee = res.data.list

        this[`${type}NameData`] = iteratee.map(item => {
          return {
            value: item._id,
            text: item.name
          }
        })
      }
    },
    postData(type, title, putFn, postFn) {
      delete this[type]['form']['_id']
      this.dialog.title = `添加${title}`
      this.dialog.mode = `post${type}`
      this.dialog.onConfirm = this.submitData(type, putFn, postFn)
      this.dialog.visible = true
    },
    putData(type, title, putFn, postFn) {
      return (row) => {
        this.dialog.title = `编辑${title}`
        this.dialog.mode = `put${type}`
        this.dialog.onConfirm = this.submitData(type, putFn, postFn)
        this.dialog.visible = true
        this[type]['form'] = {
          ...row
        }
      }
    },
    deleteData(type, title, deleteFn, getFn) {
      return (row) => {
        this.$messager.confirm({
          title: `删除${title}`,
          msg: `删除这个${title}，也会删除相关联的题库和问题哦!`,
          result: async (r) => {
            if (r) {
              const res = await deleteFn(row._id)
              if (res.code === 1) { 
                this.getData(type, getFn) 
                this.$store.dispatch('tree/getManageTree')

                type === 'exam' && this.$store.dispatch('tree/getExamTree')
              }
              else error(this, res.message)
            }
          }
        });
      }
    },
    submitData(type, putFn, postFn) {
      return async () => {
        let res, params = this[type]['form']
        if (this.dialog.mode === `put${type}`) {
          res = await putFn(params)
        } else {
          res = await postFn(params)
        }
        if (res && res.code === 1) {
          success(this, res.message)
          this.handlerType(type).getData()
          this.$store.dispatch('tree/getManageTree')

          if (type === 'exam') {
            this.$store.dispatch('tree/getExamTree')
            this.$router.push({
              path: `/exam/${res.data._id}`,
              query: { name: this.exam.form.question_name, exam_name: res.data.name }
            })
          }
        } else error(this, res.message)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>