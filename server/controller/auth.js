const Auth = require('../model/Auth')
const config = require('../config')
const App = require('./App')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const md5decode = password => {
  return crypto.createHash('md5').update(password).digest('hex')
}

class AuthController extends App {
  async login(ctx) {
    let { authAccout, password } = ctx.request.body
    const auth = await Auth.findOne({ authAccout })
    if (auth) {
      if (auth.password === md5decode(password)) {
        const token = jwt.sign({
          username: auth.authAccout,
          password: auth.password,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        }, config.AUTH.jwtSecret)
        super.result(ctx, {
          code: 1,
          message: '登录成功',
          data: {
            token,
            lifeTime: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
          }
        })
      } else super.error(ctx, '密码错误')
    } else {
      super.error(ctx, '登录失败, 账户不存在')
    }
  }

  async getAuth(ctx) {
    const auth = await Auth.findOne({}, '_id name authAccount')
    if (auth) {
      super.result(ctx, {
      code: 1,
      message: '获取用户信息成功',
      data: auth
      })
    } else super.error(ctx, '获取用户失败')
  }

  async editAuth(ctx) {
    const { _id, name, authAccount } = ctx.request.body
    const res = await Auth.findOne({}, '_id name authAccount')
    if (res) {
      let auth = await Auth.findByIdAndUpdate(_id, { _id, name, authAccount }, { new: true })
      if (auth) super.success(ctx, '修改信息成功')
      else super.error(ctx, '修改失败')
    } else {
      super.error(ctx, '修改信息失败')
    }
  }
}

module.exports = new AuthController()