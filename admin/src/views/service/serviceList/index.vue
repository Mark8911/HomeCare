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
        prop="aw_userinfo.name"
        label="姓名"
        show-overflow-tooltip
        header-align="center"
        align="center"
        sortable
      />
      <el-table-column
        v-slot="scope"
        label="性别"
        header-align="center"
        align="center"
      >
        {{ scope.row.aw_userinfo.sex == 1 ? "男" : "女" }}
      </el-table-column>
      <el-table-column
        prop="aw_userinfo.address"
        label="家庭住址"
        show-overflow-tooltip
        header-align="center"
        align="center"
        width="250"
      />
      <el-table-column
        prop="item"
        label="服务项目"
        show-overflow-tooltip
        header-align="center"
        align="center"
        width="250"
      />
      <el-table-column
        prop="person"
        label="服务人员"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="time"
        label="服务时间"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="score"
        label="评分"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="evaluate"
        label="满意度"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
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
import { getServiceList } from "@/api/user";

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
      vm.getServiceList();
    });
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
      this.page.pagenum = val;
      this.currentPage = val;
      this.getServiceList();
    },
    getServiceList() {
      getServiceList(this.page).then((response) => {
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
    onAction(type, row) {
      switch (type) {
        case "detail":
          this.$router.push({
            path: `/serviceDetail/serviceDetail`,
            query: {
              id: row.id,
            },
          });
          break;
      }
    },
    deleteClick(id) {
      deleteProduct(id).then((response) => {
        const res = response.data;
        if (res.status === 200) {
          this.$message.success(res.msg);
          this.getServiceList();
        } else {
          this.$message.error(res.msg);
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
.el-popover__reference {
  margin-left: 20px;
}
</style>
