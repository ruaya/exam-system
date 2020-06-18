<template>
  <Tabs :scrollable="true" style="width:100%;height:100%">
    <TabPanel
      ref="tab"
      :tabWidth="200"
      v-for="(item, index) in tabData" 
      :key="item.path" 
      :title="item.title"
      :closable="true"
      @click="toView(item)"
      @tabClose="closeTab(index)">
      <router-view></router-view>
    </TabPanel>
  </Tabs>
</template>

<script>
export default {
  name: "tab",
  data() {
    return {
      tabData: []
    }
  },
  watch: {
    $route(newVal) {
      this.setTab(newVal)
    }
  },
  created() {
    this.setTab(this.$route)
  },
  methods: {
    toView(item) {
      this.$router.push(`${item.path}`)
    },
    isActive(path) {
      return path === this.$route.fullPath
    },
    closeTab(index) {
      const deleteTab = this.tabData.splice(index, 1)
      const nextTab = this.tabData[index] ? this.tabData[index] : this.tabData[index - 1]
      if (nextTab) {
        deleteTab === this.$route.fullPath && this.$router.push(nextTab.path)
      } else {
        this.$router.push('/')
      }
    },
    setTab(route) {
      const isExist = this.tabData.some(item => item.path === route.fullPath)
      const isNewView = this.tabData.some(item => item.path.match(/\/(\S*)\//)[1] === route.fullPath.match(/\/(\S*)\//)[1])
      console.log(isNewView)
      if (isNewView) {
        const index = this.tabData.findIndex(item => item.path === route.fullPath)
        this.tabData.splice(index, 1)
      }
      !isExist && this.tabData.push({
        title: route.meta.title,
        path: route.fullPath
        // name: route.matched[0].components.default.name
      })
    },
    closeAllTab() {
      this.tabData = []
      this.$router.push('/')
    },
    closeOtherTab() {
      const currentTab = this.tabData.filter(item => item.path === this.$route.fullPath)
      this.tabData = currentTab
    }
  }
};
</script>

<style lang="scss" scoped>
</style>