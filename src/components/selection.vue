<template>
  <div class="selection-box">
    <template v-if="mode === 'brief'">
      <TextBox :multiline="true" v-model="answer_clone" style="width:100%;height:120px"></TextBox>
    </template>

    <template v-if="mode === 'single' || mode === 'multiple'">
      <div v-for="(selection, index) in selectionData" :key="index" style="margin-bottom:10px">
        <RadioButton name="group1" :inputId="selection" :value="answer_clone" v-model="answer_clone"></RadioButton>
        <Label :for="selection" style="margin-left: 10px; width: 30px">{{ letterArr[index] }}</Label>
        <TextBox :value="selection" style="width: 70%" :disiabled="true"></TextBox>
        <LinkButton iconCls="icon-cut" @click="editSelection(index)" v-show="editabled"></LinkButton>
        <LinkButton iconCls="icon-remove" @click="removeSelection(index)" v-show="editabled"></LinkButton>
      </div>
      <LinkButton iconCls="icon-add" @click="addSelection" v-show="editabled">添加</LinkButton>
    </template>

    <template v-if="mode === 'judgement'">
      <div v-for="(selection, index) in ['正确', '错误']" :key="index" style="margin-bottom:10px">
        <RadioButton name="group1" :inputId="selection" v-model="anser_clone"></RadioButton>
        <Label :for="selection">{{ selection }}</Label>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "answer",
  props: ["mode", "selectionData", "answer", "editabled"],
  /* model: {
    prop: "answer",
    event: "change:answer"
  }, */
  data() {
    return {
      textDisable: true,
      letterArr: [],
      // 子组件的值
      selection_clone: this.selectionData,
      answer_clone: this.answer,
    };
  },
  watch: {
    // data只会在初始化时运行一次，prop是异步传过来的数据, 所以总是空
    answer(newVal) {
      this.answer_clone = newVal
    },
    selectionData(newVal) {
      this.selection_clone = newVal
    },
    selection_clone(newVal) {
      if (newVal) {
        this.$emit("updata:selection", newVal);
      }
    },
    answer_clone(newVal) {
      this.$emit("updata:answer", newVal);
    }
  },
  mounted() {
    this.letterArr = this.newsetDesc();
  },
  methods: {
    newsetDesc() {
      let letterArr = [];
      for (var i = 65, j = 0; i < 91; i++, j++) {
        letterArr[j] = String.fromCharCode(i);
      }
      return letterArr;
    },
    addSelection() {
      this.$messager.prompt({
        title: "add",
        msg: "添加问题",
        result: r => {
          if (r) {
            this.selection_clone.push(r);
          }
        }
      });
    },
    removeSelection(index) {
      this.selection_clone.splice(index, 1);
    },
    editSelection(index) {
      this.$messager.prompt({
        title: "change",
        msg: "更改问题",
        result: r => {
          if (r) {
            this.selection_clone[index] = r;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.selection-box {
  width: 80%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #000;
  box-sizing: border-box;
}
</style>