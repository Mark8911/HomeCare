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
        <el-input class="input-item" v-model="accountForm.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input class="input-item" v-model="accountForm.age" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select
          class="input-item"
          v-model="accountForm.sex"
          placeholder="请选择"
        >
          <el-option label="男" value="1"> </el-option>
          <el-option label="女" value="0"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker
          class="input-item"
          v-model="accountForm.birth"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="证件号" prop="idCard">
        <el-input class="input-item" v-model="accountForm.idCard" />
      </el-form-item>
      <el-form-item label="家庭住址" prop="address">
        <el-input class="input-item" v-model="accountForm.address" />
      </el-form-item>
      <el-form-item label="婚姻状况" prop="marital">
        <el-input class="input-item" v-model="accountForm.marital" />
      </el-form-item>
      <el-form-item label="残疾类型" prop="type">
        <el-input class="input-item" v-model="accountForm.type" />
      </el-form-item>
      <el-form-item label="备注" prop="introduction">
        <el-input
          class="input-item"
          v-model="accountForm.introduction"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 8 }"
        />
      </el-form-item>
      <el-form-item label="照片" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action=""
          v-model="accountForm.imgUrl"
          :http-request="uploadURL"
          :multiple="true"
          :before-upload="handleBeforeUpload"
          :limit="8"
        >
          <img
            v-if="accountForm.imgUrl"
            :src="accountForm.imgUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <div class="contact-box">
        <div
          v-for="(item, index) in accountForm.contactList"
          :key="index"
          class="contact-item"
        >
          <h2>联系人{{ index + 1 }}</h2>
          <el-form-item label="姓名">
            <el-input class="input-item" v-model="item.conName" type="input" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input class="input-item" v-model="item.conAge" type="input" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select
              class="input-item"
              v-model="item.conSex"
              placeholder="请选择"
            >
              <el-option label="男" value="1"> </el-option>
              <el-option label="女" value="0"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="与服务对象关系">
            <el-input class="input-item" v-model="item.relation" type="input" />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input class="input-item" v-model="item.conPhone" type="input" />
          </el-form-item>
          <el-form-item label="职业">
            <el-input class="input-item" v-model="item.conJob" type="input" />
          </el-form-item>
        </div>
      </div>
      <el-form-item>
        <el-popconfirm
          v-if="!edit"
          confirm-button-text="确定"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确认添加该用户吗？"
          @onConfirm="addAccount"
        >
          <el-button slot="reference" type="primary" round plain>
            添加用户
          </el-button>
        </el-popconfirm>
        <el-popconfirm
          v-else
          confirm-button-text="确定"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确认保存更改吗？"
          @onConfirm="_updateUserInfo"
        >
          <el-button slot="reference" type="primary" round plain>
            编辑用户
          </el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getRolesList } from "@/api/role";
import { addAccount, getUserDetail, updateUserInfo } from "@/api/user";
import { uploadFile } from "@/api/file";
import VueCoreImageUpload from "vue-core-image-upload";
import { client, getFileNameUUID } from "@/utils/alioss";

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
      accountForm: {
        name: "",
        idCard: "",
        address: "",
        sex: "",
        birth: "",
        type: "",
        introduction: "",
        imgUrl: "",
        contactList: [
          {
            conName: "",
            conAge: "",
            conSex: "",
            relation: "",
            conPhone: "",
            conJob: "",
          },
          {
            conName: "",
            conAge: "",
            conSex: "",
            relation: "",
            conPhone: "",
            conJob: "",
          },
          {
            conName: "",
            conAge: "",
            conSex: "",
            relation: "",
            conPhone: "",
            conJob: "",
          },
        ],
      },
      accountFormRules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请输入性别",
            trigger: "blur",
          },
        ],
        birth: [
          {
            required: true,
            message: "请输入出生日期",
            trigger: "blur",
          },
        ],
        idCard: [
          {
            required: true,
            message: "请输入证件号",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入家庭住址",
            trigger: "blur",
          },
        ],
        marital: [
          {
            required: true,
            message: "请输入婚姻状况",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请输入残疾类型",
            trigger: "blur",
          },
        ],
      },
      // 角色列表
      roles: [],
      // 图片默认提交地址，未使用。
      action: "",
      // 上传文件列表
      fileList: [],
      // 是否禁用上传
      uploadDisabled: false,
      // 封面图片弹窗
      dialogImageUrl: "",
      dialogVisible: false,
      edit: false,
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
          let {
            address,
            age,
            aw_contactusers,
            birth,
            idCard,
            imgUrl,
            introduction,
            marital,
            name,
            person_id,
            sex,
            type,
          } = res.data.data[0];
          let contactList = this.accountForm.contactList;
          if (aw_contactusers.length > 0) {
            for (let i = 0; i < aw_contactusers.length; i++) {
              contactList[i] = aw_contactusers;
            }
          }
          console.log(aw_contactusers);
          this.accountForm = {
            address,
            age,
            birth,
            idCard,
            imgUrl,
            introduction,
            marital,
            name,
            person_id,
            sex,
            type,
            contactList,
          };
        }
      });
    },
    handleBeforeUpload(file) {
      const isJPEG = file.name.split(".")[1] === "jpeg";
      const isJPG = file.name.split(".")[1] === "jpg";
      const isPNG = file.name.split(".")[1] === "png";
      const isWEBP = file.name.split(".")[1] === "webp";
      const isGIF = file.name.split(".")[1] === "gif";
      const isLt500K = file.size / 1024 / 1024 / 1024 / 1024 < 4;
      if (!isJPG && !isJPEG && !isPNG && !isWEBP && !isGIF) {
        this.$message.error("上传图片只能是 JPEG/JPG/PNG 格式!");
      }
      if (!isLt500K) {
        this.$message.error("单张图片大小不能超过 4mb!");
      }
      return (isJPEG || isJPG || isPNG || isWEBP || isGIF) && isLt500K;
    },
    imageuploaded(res) {
      console.log(res);
    },
    handleError() {
      this.$notify.error({
        title: "上传失败",
        message: "图片上传接口上传失败，可更改为自己的服务器接口",
      });
    },
    uploadURL(file) {
      //注意哦，这里指定文件夹'image/'，尝试过写在配置文件，但是各种不行，写在这里就可以
      var fileName = "image/" + "banner" + `${Date.parse(new Date())}` + ".jpg";
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      client()
        .multipartUpload(fileName, file.file, {
          progress: function (percentage, cpt) {
            console.log("打印进度", percentage);
          },
        })
        .then((res) => {
          //此处赋值，是相当于上传成功之后，手动拼接服务器地址和文件名
          //简单描述就是bucket概括，里面的域名地址，粘贴过来可以直接用
          console.log(res, "res++++");
          this.accountForm.imgUrl =
            "https://service0615.oss-cn-hangzhou.aliyuncs.com/" + fileName;
        });
    },
    getRolesList() {
      getRolesList().then((response) => {
        const res = response.data;
        if (res.status === 200) {
          this.roles = res.data.rolesList;
        } else {
          this.$message.error("获取角色选项失败");
        }
      });
    },
    addAccount() {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          addAccount(this.accountForm).then((response) => {
            const res = response.data;
            if (res.status === 200) {
              this.$message.success("账户添加成功");
              // this.$router.push("manage_account");
            } else {
              this.$message.error("账户添加失败");
            }
          });
        } else {
          this.$message.error("添加失败，请检查内容是否填写完整！");
          return false;
        }
      });
    },
    _updateUserInfo() {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          updateUserInfo(this.accountForm).then((response) => {
            const res = response.data;
            if (res.status === 200) {
              this.$message.success("账户添加成功");
              // this.$router.push("manage_account");
            } else {
              this.$message.error("账户添加失败");
            }
          });
        } else {
          this.$message.error("添加失败，请检查内容是否填写完整！");
          return false;
        }
      });
    },

    // 上传文件
    uploadFile(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      uploadFile(formData).then((response) => {
        const res = response.data;
        // 上传状态
        if (res.status === 200) {
          this.accountForm.avatar = res.data.fileUrl;
          param.onSuccess();
          this.uploadDisabled = true;
        } else {
          this.accountForm.avatar = "";
          this.$message.error("上传失败,请联系管理员！");
          param.onError();
          this.uploadDisabled = false;
        }
      });
    },
    beforeImgUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isLt1M) {
        this.$message.error("上传封面图片大小不能超过 1MB!");
      }
      return isLt1M;
    },
    // 上传中
    imgOnProgress(event, file) {
      this.uploadDisabled = true;
    },
    // 移除封面图片
    handleRemove(file) {
      this.uploadDisabled = false;
    },
    // 查看封面图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
