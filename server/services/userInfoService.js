const {
  UserInfo,
  ContactUser
} = require('../models/index')

class UserInfoService {
  // 根据id查询
  async getUserInfoById(id) {
    return UserInfo.findAll({
      where: {
        person_id: id
      },
      include: [{
        model: ContactUser,
      }],
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
    let res = await UserInfo.create(userInfo)
    let list = userInfo.contactList
    list.forEach(async element => {
      element.person_id = res.dataValues.person_id
      console.log(element, 'element')
      await ContactUser.create(element)
    });
    return res
  }
  
  async getUserInfoList(params) {
    return UserInfo.findAndCountAll({
      limit: parseInt(params.pagesize),
      include: [{
        model: ContactUser
      }],
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
