const {
  sequelize,
  Op
} = require('../config/connect')
const Account = require('./account')
const News = require('./news')
const RecommendNews = require('./RecommendNews')
const NewsType = require('./NewsType')
const Products = require('./products')
const Job = require('./jobs')
const JobCategory = require('./jobCategory')
const CityInfo = require('./cityInfo')
const Role = require('./role')
const MenuList = require('./menuList')
const RoleMenuList = require('./roleMenuList')
const Permission=require('./permission')
const RolePermission=require('./rolePermission')
const MenuPermission=require('./menuPermission')
const UserInfo = require('./userInfo')
const HomeCare = require('./HomeCare')
const ContactUser = require('./ContactUser')

// 用户和服务一对多
UserInfo.hasMany(HomeCare, { foreignKey: 'person_id'})
HomeCare.belongsTo(UserInfo, { foreignKey: 'person_id'})
// 用户和联系人一对多
UserInfo.hasMany(ContactUser, { foreignKey: 'person_id'})
ContactUser.belongsTo(UserInfo, { foreignKey: 'person_id'})


// const RecruitType=require('./recruitType')
// 新闻关联
// 一（News）对一（RecommendNews）
News.hasOne(RecommendNews, { foreignKey: 'news_id' })
RecommendNews.belongsTo(News, { foreignKey: 'news_id' })
// 一（News）对多（NewsType）
NewsType.hasMany(News, { foreignKey: 'type' })
News.belongsTo(NewsType, { foreignKey: 'type' })

// 职位关联
// 一（Job）对多（JobCategory）
JobCategory.hasMany(Job, { foreignKey: 'job_category' })
Job.belongsTo(JobCategory, { foreignKey: 'job_category' })
// 一（Job）对多（CityInfo）
CityInfo.hasMany(Job, { foreignKey: 'city' })
Job.belongsTo(CityInfo, { foreignKey: 'city' })
// 角色关联
// 一（Job）对多（CityInfo）
Role.hasMany(Account, { foreignKey: 'role_id' })
Account.belongsTo(Role, { foreignKey: 'role_id' })
// 多对多
MenuList.belongsToMany(Role, { through: RoleMenuList })
Role.belongsToMany(MenuList, { through: RoleMenuList })
// 多对多
Role.belongsToMany(Permission, { through: RolePermission })
Permission.belongsToMany(Role, { through: RolePermission })
// 一对多
// MenuList.hasMany(Permission, { foreignKey: 'menu_id' })
// Permission.belongsTo(MenuList, { foreignKey: 'menu_id' })
sequelize.sync({ alter: true }).then(r => console.log('所有模型均已成功同步.'))

module.exports = {
  Op,
  Account,
  News,
  NewsType,
  RecommendNews,
  Products,
  Job,
  JobCategory,
  CityInfo,
  Role,
  MenuList,
  RoleMenuList,
  Permission,
  RolePermission,
  MenuPermission,
  UserInfo,
  HomeCare,
  ContactUser
}

