<template>
  <div class="dialog" v-show="dialogVisible">
    <div class="dialog-body" v-show="dialogVisible">
      <div class="dialog-head">
        <h2>{{ title }}</h2>
        <a href="javascript:;" @click="hide"><i>X</i></a>
      </div>
      <div class="dialog-content">
        <slot></slot>
      </div>
      <div class="dialog-foot">
        <LinkButton btnCls="c5" style="width:47%;height:34px;margin:10px 0" @click="confirmEvent">确认</LinkButton>
        <LinkButton btnCls="c5" style="width:47%;height:34px;margin:10px 0" @click="hide">取消</LinkButton>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
const Confirm = {
  name: "confirm",
  props: ["visible", "title"],
  computed: {
    dialogVisible() {
      return this.visible
    }
  },
  methods: {
    confirmEvent() {
      this.$emit('confirmEvent');
      this.hide()
    },
    hide() {
      this.$emit('update:visible', false)
    }
  }
};
export default Confirm;

/* let instenceCache;

export const confirm = function(title, onConfirm = () => {}) {
  if (typeof title === "function") {
    onConfirm = title;
    title = undefined;
  }

  const CofirmCtor = Vue.extend(Confirm);
  const getInstence = () => {
    if (!instenceCache) {
      instenceCache = new CofirmCtor({
        propsData: {
          title,
          onConfirm
        }
      })

      instenceCache.$mount()
      document.body.appendChild(instenceCache)
    } else {
      instenceCache.title = title
      instenceCache.onConfirm = onConfirm
    }
    return instenceCache
  }
  getInstence()
}; */
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba($color: #fff, $alpha: 0.3);
  z-index: 999;

  >.dialog-body {
    position: absolute;
    left: calc(50% - 10rem);
    top: 10rem;
    width: 20rem;
    // height: 24rem;
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 8px 46px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.03);

    >.dialog-head {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      z-index: 2;
      color: red;

      .iconfont {
        font-size: 1.3rem;
      }
    }
    .dialog-foot {
      display: flex;
      justify-content: space-between
    }
  }
}
</style>