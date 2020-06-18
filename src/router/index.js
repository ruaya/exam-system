import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import manage from '../views/manage.vue'

Vue.use(VueRouter);

const routes = [
  /* 查看所有, 添加，修改，删除 题库集 题库 考试*/
  {
    path: "/",
    name: "manage",
    component: manage,
    meta: { title: '管理首页' }
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'login' },
    component: Login
  },
  /* 添加题目 */
  {
    path: '/collection/:id',
    name: 'collection',
    component: () => import('../views/paperCollection.vue'),
    meta: { title: '题目编辑' }
  },
  /* 修改题目 */
  {
    path: '/question/:id',
    name: 'Question',
    component: () => import('../views/paperCollection.vue'),
    meta: { title: '题目编辑' }
  },
  /* 查看题库下的题目，删除单个题目*/
  {
    path: '/paper/:id',
    name: 'Paper',
    component: () => import('../views/paper.vue'),
    meta: { title: '题目管理' }
  },
  /* 给考试添加题目 */
  {
    path: '/exam/:id',
    name: 'Exam',
    component: () => import('../views/exam.vue'),
    meta: { title: '考试管理' }
  },
  {
    path: '/examDetail/:id',
    name: 'ExamDetail',
    component: () => import('../views/examDetail.vue'),
    meta: { title: '考试细节' }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let token = JSON.parse(localStorage.getItem('TOKEN'))
  if (to.meta.title !== 'login') {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
export default router;
