<template>
  <div>
    <Panel :bodyStyle="{padding:'5px'}">
      <template slot="header">
        <div class="f-row">
          <div class="f-full" style="line-height:30px">{{ questionData.name }}题库 共 {{ pagination.total }} 题</div>
          <LinkButton btnCls="c5" style="width:100px;margin-right: 20px" 
            @click="$router.push(`/collection/${questionData._paperCollection}`)">添加题目?
          </LinkButton>
          <SearchBox style="width:200px" 
            placeholder="该题库下搜索" 
            v-model="keyword" 
            @search="onSearch($event)">
          </SearchBox>
        </div>
      </template>
      <div class="content">
        <DataGrid 
            :pagination="true"
            :data="questionData._questions"
            :total="pagination.total"
            :pageSize="pagination.page_size"
            pagePosition="bottom">
          <GridColumn :expander="true" width="30"></GridColumn>
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
          <GridColumn field="score" title="分值" width="10%"></GridColumn>
          <GridColumn title="操作" width="20%">
            <template slot="header">
              <div class="item">
                <div class="title">操作</div>
              </div>
            </template>
            <template slot="body" slot-scope="scope">
              <LinkButton iconCls="icon-cut" @click="editQuestion(scope.row)">修改</LinkButton>
              <LinkButton iconCls="icon-remove" @click="deleteQuestion(scope.row)">删除</LinkButton>
            </template>
          </GridColumn>
          <template slot="detail" slot-scope="scope">
            <div class="item f-row">
              <div class="f-column">
                <div class="item-desp f-full" style="padding-left: 10px">
                  <p>题目内容: {{scope.row.content}}</p>
                  <p>答案: {{ scope.row.answer }}</p>
                </div>
              </div>
            </div>
          </template>
        </DataGrid>

      </div>
    </Panel>
  </div>
</template>

<script>
import { error } from '../utils/message'
import api from '../api'
export default {
  name: 'paper',
  data() {
    return {
      keyword: '',
      pagination: {
        current_page: 1,
        page_size: 20,
        total: 20
      },
      questionData: []
    }
  },
  created() {
    this.getData()
  },
  watch: {
    '$route'() {
      this.getData()
    }
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
    async onSearch(event) {
      this.keyword = event.value;
      if (event.value === '') return error(this, '不要发送空白信息!')
      const res = await api.searchQuestion({ keyword: this.keyword })
      if (res) {
        this.questionData = { name: '搜索结果:', _questions: { ...res.data.list }}
        this.pagination.total = res.data.count
        console.log(this.questionData)
        
      } else error(this, res.message)
    },
    async getData() {
      const res = await api.getQuestion({ _id: this.$route.params.id, ...this.pagination})
      if (res && res.code === 1) {
        this.questionData = res.data.list
        this.pagination.total = res.data.count
      }
      console.log(res.data)
    },
    editQuestion(row) {
      this.$router.push(`/question/${row._id}`)
    },
    deleteQuestion(row) {
      this.$messager.confirm({
        title: "confirm",
        msg: "确定删除题目吗?",
        result: async (r) => {
          if (r) {
            const res = await api.deleteQuestion(row._id)
            if (res && res.code === 1) this.getData()
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>