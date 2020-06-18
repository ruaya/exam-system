<template>
  <LayoutPanel region="west" title="功能菜单" style="width:150px; margin-top: 80px">
    <Accordion :animate="true">
      <AccordionPanel title="题目管理">
        <Tree :data="manageTree" @nodeDblClick="changeView($event)"></Tree>
      </AccordionPanel>
      <AccordionPanel title="试卷管理">
        <Tree :data="examTree" @nodeDblClick="changeExamView($event)"></Tree>
      </AccordionPanel>
    </Accordion>
  </LayoutPanel>
</template>

<script>
export default {
  name: 'west',
  created() {
    this.getManageTree()
    this.getExamTree()
  },
  computed: {
    manageTree() {
      return this.$store.state.tree.manageTree
    },
    examTree() {
      return this.$store.state.tree.examTree
    }
  },
  methods: {
    getManageTree() {
      this.$store.dispatch('tree/getManageTree')
    },
    getExamTree() {
      this.$store.dispatch('tree/getExamTree')
    },
    changeView(item) {
      if (item.children) {
        this.$router.push(`/collection/${item.id}`)
      } else {
        this.$router.push(`/paper/${item.id}`)
      }
    },
    changeExamView(item) {
      this.$router.push(`/examDetail/${item.id}`)
    }
  }
};
</script>
