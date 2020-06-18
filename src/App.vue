<template>
  <div id="app">
    <Layout style="width:100%;height:100%;">
      <north-panel></north-panel>
      <west-panel></west-panel>
      <LayoutPanel region="center" style="height:100%;margin:80px 0 0 153px">
        <tab-menu />
        <section style="width:100%">
          <router-view></router-view>
        </section>
      </LayoutPanel>
    </Layout>
  </div>
</template>

<script>
import northPanel from "./views/northPanel";
import westPanel from "./views/westPanel";
import tabMenuVue from './components/tabMenu.vue';
export default {
  data() {
    return {};
  },
  components: {
    northPanel,
    westPanel,
    tabMenu: tabMenuVue
  }
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
