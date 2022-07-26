<template>
  <el-card>
    <el-form
      ref="accountForm"
      :model="accountForm"
      :rules="accountFormRules"
      label-width="150px"
      label-position="right"
    >
      <el-form-item label="姓名" prop="name">
        {{ accountForm.name }}
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        {{ accountForm.age }}
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        {{ accountForm.sex == 1 ? "男" : "女" }}
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        {{ accountForm.birth }}
      </el-form-item>
      <el-form-item label="证件号" prop="idCard">
        {{ accountForm.idCard }}
      </el-form-item>
      <el-form-item label="家庭住址" prop="address">
        {{ accountForm.address }}
      </el-form-item>
      <el-form-item label="婚姻状况" prop="marital">
        {{ accountForm.marital }}
      </el-form-item>
      <el-form-item label="残疾类型" prop="type">
        {{ accountForm.type }}
      </el-form-item>
      <el-form-item label="备注" prop="introduction">
        {{ accountForm.introduction }}
      </el-form-item>
      <el-form-item label="照片" prop="avatar">
        <img :src="accountForm.imgUrl" class="avatar" />
      </el-form-item>
      <div class="contact-box">
        <div
          v-for="(item, index) in accountForm.contactList"
          :key="index"
          class="contact-item"
        >
          <h2>联系人{{ index + 1 }}</h2>
          <el-form-item label="姓名">
            {{ item.conName }}
          </el-form-item>
          <el-form-item label="年龄">
            {{ item.conAge }}
          </el-form-item>
          <el-form-item label="性别">
            {{ item.conSex == 1 ? "男" : "女" }}
          </el-form-item>
          <el-form-item label="与服务对象关系">
            {{ item.relation }}
          </el-form-item>
          <el-form-item label="联系方式">
            {{ item.conPhone }}
          </el-form-item>
          <el-form-item label="职业">
            {{ item.conJob }}
          </el-form-item>
        </div>
      </div>
    </el-form>
  </el-card>
</template>
<script>
import { getUserDetail } from "@/api/user";

export default {
  name: "Index",
  data() {
    return {
      src: "./static/img/img.jpg",
      fileList: [],
      fileList: [],
      Addfrom: {
        url: "",
      },
      accountForm: {},
    };
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getRolesList();
      if (this.$route.query.id) {
        this._getUserDetail();
      }
    });
  },
  created() {
    if (this.$route.query.id) {
      this._getUserDetail();
      this.edit = true;
    }
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + this.$store.getters.token, // 直接从本地获取token就行
      };
    },
  },
  methods: {
    _getUserDetail() {
      let params = {
        id: this.$route.query.id,
      };
      getUserDetail(params).then((res) => {
        if (res.status == 200) {
          this.accountForm = res.data.data[0];
          this.accountForm.contactList = res.data.data[0].aw_contactusers;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}

// .el-upload--picture-card 控制加号部分
::v-deep .disabled .el-upload--picture-card {
  display: none !important;
}

::v-deep {
  .el-form-item__content {
    width: 100%;
    margin-left: 20px !important;
  }
  .el-form-item:nth-child(2) .el-form-item__content,
  .el-form-item:nth-child(3) .el-form-item__content {
    margin-left: 28px;
  }

  .el-form-item:nth-child(6) {
    margin-left: 0;
  }

  .el-input__inner {
    width: 100%;
  }

  .el-textarea__inner {
    width: 100%;
  }
}
.input-item {
  width: 400px;
}

.contact-box {
  display: flex;
  width: 100%;
  .contact-item {
    flex: 1;
  }
}
.avatar {
  display: inline-block;
  width: 100px;
  height: auto;
}
.avatar-uploader {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  text-align: center;
  font-size: 30px;
  color: #c0ccda;
}
</style>
