<template>
  <el-card>
    <el-table
      :data="tableData"
      height="500"
      stripe
      :row-style="{ height: 50 + 'px' }"
      :cell-style="{ padding: 0 + 'px' }"
      style="width: 100%"
      :default-sort="{ prop: 'username', order: 'ascending' }"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
        sortable
      />
      <el-table-column
        prop="age"
        label="年龄"
        width="100"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="sex"
        label="性别"
        min-width="200"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="birth"
        label="出生日期"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="idCard"
        label="身份证号"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="address"
        label="家庭住址"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="birth"
        label="出生日期"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        v-slot="scope"
        label="照片"
        width="150"
        header-align="center"
        align="center"
      >
        <el-image
          :src="scope.row.imgUrl"
          style="width: 50px; height: auto; display: block"
          fit="cover"
        />
      </el-table-column>
      <el-table-column
        v-slot="scope"
        label="操作"
        width="180"
        header-align="center"
        align="center"
      >
        <el-button
          type="primary"
          round
          plain
          size="small"
          @click="onAction('edit', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          round
          plain
          size="small"
          @click="onAction('detail', scope.row)"
        >
          详情
        </el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="page.pagesize"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { getUserList } from "@/api/user";

export default {
  name: "ProductList",
  components: {},
  data() {
    return {
      total: 0,
      currentPage: 1,
      tableData: [],
      page: {
        pagenum: 1,
        pagesize: 10,
      },
    };
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getUserList();
    });
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      this.page.pagenum = val;
      this.currentPage = val;
      this.getUserList();
    },
    getUserList() {
      getUserList(this.page).then((response) => {
        const res = response.data;
        if (res.status === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          // this.$message.success('获取产品列表成功')
        } else {
          this.$message.error("获取产品列表失败");
        }
      });
    },
    // // 点击编辑产品按钮
    editClick(value) {
      this.$router.push({ path: `edit/${value}` });
    },
    onAction(type, row) {
      switch (type) {
        case "edit":
          this.$router.push({
            path: `/addPerson/addPerson`,
            query: {
              id: row.person_id,
            },
          });
        case "detail":
          this.$router.push({
            path: `/accountDetail/accountDetail`,
            query: {
              id: row.person_id,
            },
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
.el-popover__reference {
  margin-left: 20px;
}
</style>
