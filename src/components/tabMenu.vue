<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i class="icon-close">X</i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagsList: []
    };
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue) {
      this.setTags(newValue);
    }
  },
  created() {
    this.setTags(this.$route);
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },

    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/");
      }
    },

    closeAll() {
      this.tagsList = [];
      this.$router.push("/");
    },

    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    },

    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });

      !isExist &&
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          // name: route.matched[1].components.default.name
        });
    },

    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    }
  }
};
</script>


<style>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
}

a {
  text-decoration: none;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active {
  color: #fff;
  border: 1px solid #10b9d3;
  background-color: #10b9d3;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: fixed;
  right: 0;
  top: 50px;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  z-index: 10;
}
</style>
