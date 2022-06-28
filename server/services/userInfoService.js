const {
  UserInfo
} = require('../models/index')

class UserInfoService {
  // 根据id查询
  async getUserInfoById(id) {
    return UserInfo.findAll({
      where: {
        person_id: id
      },
    })
  }
  
  // 根据证件号查询
  async getUserInfoByIdCard(idCard) {
    return UserInfo.findAll({
      where: {
        idCard,
      },
    })
  }
  
  // 新增账户
  async createUser(userInfo) {
    console.log(userInfo)
    return UserInfo.create(userInfo)
  }
  
  async getUserInfoList(params) {
    console.log(JSON.stringify(params), 'params1111')
    return UserInfo.findAndCountAll({
      limit: parseInt(params.pagesize),
      // 跳过实例数目
      offset: (params.pagenum - 1) * parseInt(params.pagesize)
    })
  }
  
  // 更新账户
  async updateUserInfo(userId, data) {
    return UserInfo.update(data, {
      where: {
        person_id: userId
      },
    })
  }
  
  // 删除账户
  async deleteUserInfo(id) {
    return UserInfo.destroy({
      where: {
        person_id: id
      },
    })
  }
}

module.exports = new UserInfoService()
