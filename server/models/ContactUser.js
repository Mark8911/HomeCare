const { sequelize, DataTypes } = require("../config/connect") // 引入相关依赖以及数据库
const ContactUser = sequelize.define(
    "aw_contactuser", // 数据库中生成的表名(最终会自动在末尾添加s,因此最终数据库中生自动成表名为accounts
    { // 表字段信息配置
      con_id: {
        type: DataTypes.INTEGER(11), // 字段类型
        allowNull: false, // 是否允许为空
        autoIncrement: true,
        primaryKey: true, // 是否主键
      },
      conName: {
        type: DataTypes.STRING, // 字段类型
        allowNull: false, // 是否允许为空
        comment: '姓名'
      },
      conAge: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '年龄'
      },
      conSex: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '性别'
      },
      relation: {
        type: DataTypes.STRING, // 字段类型
        allowNull: false, // 是否允许为空
        comment: '联系人关系'
      },
      conPhone: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '联系人电话'
      },
      conJob: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '联系人职业'
      },
    },
    {
      freezeTableName: false,
      timestamps: true, // 是否自动在数据表中添加数据操作时间
    }
)

// UserInfo.sync({force:true}) // 是否自动创建表

module.exports = ContactUser
