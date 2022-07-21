
const moment = require('moment') // 时间格式化插件

const UserInfoService = require('../services/userInfoService')

module.exports = {
  // 添加用户
  addUserInfo: async (ctx) => {
    const userObj = ctx.request.body
    const count = await UserInfoService.getUserInfoByIdCard(userObj.idCard)
    if (count.length > 0) {
      ctx.body = {
        status: 'error',
        msg: '当前用户已存在'
      }
    } else {
      const result = await UserInfoService.createUser(userObj)
      if (result) {
        ctx.body = {
          status: 200,
          msg: '添加成功'
        }
      } else {
        ctx.body = {
          status: 'error',
          msg: '添加失败'
        }
      }
    }
  },

  // 获取用户列表
  getUserList: async (ctx) => {
    const params = ctx.request.query
    const {
      count,
      rows
    } = await UserInfoService.getUserInfoList(params)
    if (count > 0) {
      const job_post_list = []
      for (let i = 0; i < rows.length; i++) {
        const data = rows[i].dataValues
        job_post_list.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          list: job_post_list,
          total: count,
          limit: 10
        }
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '查询列表失败',
        data: null
      }
    }
  },

  // 获取用户详情
  getUserDetail: async (ctx) => {
    const params = ctx.request.query
    console.log(params, 'ddd')
    const result = await UserInfoService.getUserInfoById(params.id)
    if (result) {
      ctx.body = {
        status: 200,
        data: result,
        msg: ''
      }
    } else {
      ctx.body = {
        status: 'error',
        msg: '查询失败'
      }
    }
  }
}