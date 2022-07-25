
const moment = require('moment') // 时间格式化插件

const HomeCareService = require('../services/HomeCareService')

module.exports = {
  // 添加
  addService: async (ctx) => {
    const serviceObj = ctx.request.body
    
    const result = await HomeCareService.createService(serviceObj)
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
  },

  // 获取服务列表
  getServiceList: async (ctx) => {
    const params = ctx.request.query
    const {
      count,
      rows
    } = await HomeCareService.getServiceList(params)
    if (count > 0) {
      const post_list = []
      for (let i = 0; i < rows.length; i++) {
        const data = rows[i].dataValues
        post_list.push(data)
      }
      ctx.body = {
        status: 200,
        msg: '获取成功',
        data: {
          list: post_list,
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

  // 获取服务详情
  getServiceDetail: async (ctx) => {
    const params = ctx.request.query
    console.log(params, 'ddd')
    const result = await HomeCareService.getServiceById(params.id)
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