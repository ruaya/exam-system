<template>
  <div class="paperCollection-page">
    <Panel title="基本信息" :collapsible="true" style="height:200px">
      <div class="text-group">
        <div class="text-item">
          <div class="text">题库集</div>
          <TextBox style="width:50%" v-model="questionForm._paperCollectionName"></TextBox>
        </div>
        <div class="text-item">
          <div class="text">题库</div>
          <ComboBox v-model="questionForm._papers" :data="paperData"></ComboBox>
          <LinkButton btnCls="c5" style="width:100px;margin-left: 20px" @click="$router.push('/')">先去添加题库?</LinkButton>
        </div>
        <div class="text-item">
          <div class="text">知识点</div>
          <TextBox style="width:50%" v-model="questionForm.name"></TextBox>
        </div>
        <div class="text-item">
          <div class="text">难度</div>
          <ComboBox v-model="questionForm.difficutly" :data="difficutlyData"></ComboBox>
        </div>
        <div class="text-item">
          <div class="text">默认分数</div>
          <TextBox style="width:20%" v-model="questionForm.score"></TextBox>
        </div>
        <div class="text-item">
          <div class="text">题型</div>
          <ComboBox v-model="questionForm.type" :data="typeData"></ComboBox>
        </div>
      </div>
    </Panel>
    
    <Panel title="题目内容" :collapsible="true" style="height:400px">
      <div class="text-group">
        <div class="text-item">
          <div class="text">题干内容</div>
          <div class="content">
            <TextBox
              :multiline="true"
              v-model="questionForm.content"
              style="width:500px;height:120px"
            ></TextBox>
            <TextBox :placeholder="filename" style="width:300px;height:30px">
              <Addon>
                <FileButton style="width:100px" @select="onFileSelect($event)">选择</FileButton>
              </Addon>
            </TextBox>
          </div>
        </div>
        <div class="text-item">
          <div class="text">答案及候选项</div>
          <div class="content">
            <question-selection
              :mode="questionForm.type"
              :selectionData="questionForm.selection"
              @updata:selection="questionForm.selection=$event"
              :answer="questionForm.answer || ''"
              @updata:answer="questionForm.answer=$event"
              :editabled="true">
            </question-selection>
          </div>
        </div>
        <div class="text-item">
          <div class="text">试题解析</div>
          <TextBox
            :multiline="true"
            v-model="questionForm.analysis"
            style="width:500px;height:60px"
          ></TextBox>
        </div>
      </div>
    </Panel>

    <Panel :bodyStyle="{padding:'5px'}" style="text-align:right">
      <LinkButton iconCls="icon-ok" @click="submitForm">保存</LinkButton>
    </Panel>
  </div>
</template>

<script>
import api from "../api";
import selectionVue from '../components/selection.vue';
export default {
  name: "paperCollection",
  data() {
    return {
      path: '',
      mode: '',
      filename: "上传多媒体文件",
      questionForm: {
        _paperCollectionName: '',
        _paperCollection: "",
        _paperName: '',
        _papers: "",
        name: "",
        difficutly: 1,
        score: 2,
        type: "single",
        content: "",
        selection: ['', '', '', ''],
        answer: "",
        analysis: ""
      },

      paperData: [],
      typeData: [
        { value: "single", text: "单选" },
        { value: "multiple", text: "多选" },
        { value: "brief", text: "主观" },
        { value: "judgement", text: "判断" }
      ],
      difficutlyData: [
        { value: 1, text: "1级"},
        { value: 2, text: "2级"},
        { value: 3, text: "3级"},
        { value: 4, text: "4级"},
        { value: 5, text: "5级"},
      ]
    };
  },
  watch: {
    '$route'() {
      if (this.path === 'collection') {
        this.getPaper()
      } else if (this.path === 'question') {
        this.getEditQuestion()
      }
    }
  },
  created() {
    this.path = this.$route.fullPath.match(/\/(\S*)\//)[1]
    if (this.path === 'collection') {
      this.mode = 'addQuestion'
      this.getPaper()
    } else if (this.path === 'question') {
      this.mode = 'editQuestion'
      this.getEditQuestion()
    }
  },
  methods: {
    async getPaper() {
      const res = await api.getPapersByCollection({ _id: this.$route.params.id});
      if (res && res.code === 1) {
        this.questionForm._paperCollectionName = res.data.name
        this.questionForm._paperCollection = res.data._id
        this.paperData = res.data._papers.map(paper => {
          return {
            value: paper._id,
            text: paper.name
          };
        });
      }
    },
    // 获得要修改的题目
    async getEditQuestion() {
      const res = await api.getQuestionById(this.$route.params.id)
      if (res && res.code === 1) {
        this.questionForm = res.data
        this.questionForm._paperCollectionName = res.data._paperCollection.name
        const res2 = await api.getPapersByCollection(this.questionForm._paperCollection)
        if (res2) {
          this.paperData = res2.data._papers.map(paper => {
            return {
              value: paper._id,
              text: paper.name
            };
          })
        }
        // this.questionForm._paperName = res.data._papers[0].name
      }
    },
    async submitForm() {
      let res 
      if (this.mode === 'addQuestion') {
        res = await api.postQuestion(this.questionForm);
      } else {
        res = await api.putQuestion(this.questionForm);
      }
      
      if (res && res.code === 1) {
        this.$messager.alert({
          title: "success",
          msg: res.message
        });
      }
    },
    onFileSelect(event) {
      this.filename = event[0].name;
    }
  },
  components: {
    questionSelection: selectionVue
  }
};
</script>

<style lang="scss" scoped>
.text-group {
  width: 100%;
  .text-item {
    margin: 10px 0;
    display: flex;
    align-items: center;
    .text {
      flex: 0 0 15%;
      text-align: right;
      margin-right: 15px;
      
    }
    .content {
      flex: 1;
    }
  }
}
</style>